import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import babyMonitoringImage from '@/assets/babyImage3.png';
import VideoStreamer from '@/components/ui/webcam/VideoStreamer.tsx';

interface AutoRenderWebcamProps {
  webcamSize?: { width: number; height: number; facingMode: string };
  isWatcher?: boolean;
}

type ExtendedWebcam = Webcam & {
  stream?: MediaStream;
};

const AutoRenderWebcam = ({
  webcamSize = { width: 320, height: 400, facingMode: 'user' },
  isWatcher = true,
}: AutoRenderWebcamProps) => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const webcamRef = useRef<ExtendedWebcam>(null);
  const videoRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const videoWsRef = useRef<WebSocket | null>(null);
  const audioWsRef = useRef<WebSocket | null>(null);

  const initializeWebSocket = (url: string, onOpen: () => void, onError: (error: Event) => void) => {
    const ws = new WebSocket(url);

    ws.onopen = onOpen;
    ws.onerror = onError;
    ws.onclose = () => console.log(`WebSocket 연결 종료: ${url}`);
    return ws;
  };

  useEffect(() => {
    const checkWebcamStatus = async () => {
      setLoading(true);
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        if (hasCamera) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (stream) {
            setIsWebcamOn(true);
            stream.getTracks().forEach(track => track.stop());
          }
        }
      } catch (e) {
        console.error('웹캠을 확인하는 중 오류가 발생했습니다:', e);
      } finally {
        setLoading(false);
      }
    };

    checkWebcamStatus();
  }, []);

  useEffect(() => {
    const videoWs = initializeWebSocket(
      `${import.meta.env.VITE_SOCKET_URL}/video?userId=26`,
      () => {
        console.log('Video WebSocket 연결 성공');
      },
      err => {
        console.error('Video WebSocket 오류:', err);
      }
    );

    videoWs.onclose = event => {
      console.log(event);
      console.log(`Video WebSocket 닫힘. 코드: ${event.code}, 이유: ${event.reason}`);
    };

    const audioWs = initializeWebSocket(
      `${import.meta.env.VITE_SOCKET_URL}/audio`,
      () => {
        console.log('Audio WebSocket 연결 성공');
      },
      err => {
        console.error('Audio WebSocket 오류:', err);
      }
    );

    videoWsRef.current = videoWs;
    audioWsRef.current = audioWs;

    return () => {
      videoWs.close();
      audioWs.close();
      videoWsRef.current = null;
      audioWsRef.current = null;
    };
  }, []);

  const chunkMessage = (data, chunkSize) => {
    const chunks = [];
    const totalSize = data.size;
    let start = 0;

    while (start < totalSize) {
      const chunk = data.slice(start, start + chunkSize);
      chunks.push(chunk);
      start += chunkSize;
    }

    return chunks;
  };

  const startStreaming = () => {
    if (!webcamRef.current || !webcamRef.current.stream) {
      console.error('웹캠 스트림을 찾을 수 없습니다.');
      return;
    }

    const stream = webcamRef.current.stream;

    // 비디오 트랙 설정
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoRecorder = new MediaRecorder(new MediaStream(videoTracks), {
        mimeType: 'video/webm; codecs=vp9',
      });

      videoRecorder.ondataavailable = event => {
        if (event.data.size > 0 && videoWsRef.current?.readyState === WebSocket.OPEN) {
          const chunkSize = 8 * 1024; // 8KB로 나누기
          const dataChunks = chunkMessage(event.data, chunkSize);

          dataChunks.forEach(chunk => {
            if (videoWsRef.current?.readyState === WebSocket.OPEN) {
              videoWsRef.current.send(chunk);
            }
          });
          console.log('비디오 데이터 전송 완료', event.data);
        } else {
          console.log('비디오 전송 실패: WebSocket 상태', videoWsRef.current?.readyState);
        }
      };

      videoRecorder.start(1000);
      videoRecorderRef.current = videoRecorder;
    }

    // 오디오 트랙 설정
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length > 0) {
      const audioRecorder = new MediaRecorder(new MediaStream(audioTracks), {
        mimeType: 'audio/webm; codecs=opus',
      });

      audioRecorder.ondataavailable = event => {
        if (event.data.size > 0 && audioWsRef.current?.readyState === WebSocket.OPEN) {
          audioWsRef.current.send(event.data);
          console.log('오디오 데이터 전송');
        }
      };
      audioRecorder.start(1000);
      audioRecorderRef.current = audioRecorder;
    }
  };

  return (
    <div className="webcam-container">
      <button onClick={startStreaming}>스트리밍 시작</button>
      {loading ? (
        <div>
          <p>웹캠 상태를 확인 중...</p>
          <img
            src={babyMonitoringImage}
            alt="Baby Monitoring"
            className="w-full max-w-xs h-auto border-4 border-red-500"
          />
        </div>
      ) : isWatcher ? (
        <VideoStreamer socketUrl={`${import.meta.env.VITE_SOCKET_URL}/video?userId=26`} />
      ) : isWebcamOn ? (
        <Webcam ref={webcamRef} videoConstraints={webcamSize} />
      ) : (
        <p>웹캠을 사용할 수 없습니다.</p>
      )}
    </div>
  );
};

export default AutoRenderWebcam;
