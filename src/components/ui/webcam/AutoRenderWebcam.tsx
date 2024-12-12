import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import babyMonitoringImage from '@/assets/babyImage3.png';

interface AutoRenderWebcamProps {
  webcamSize?: { width: number; height: number; facingMode: string };
}

type ExtendedWebcam = Webcam & {
  stream?: MediaStream;
};

const AutoRenderWebcam = ({ webcamSize = { width: 320, height: 400, facingMode: 'user' } }: AutoRenderWebcamProps) => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoWsState, setVideoWsState] = useState<WebSocket['readyState']>(WebSocket.CLOSED);
  const [audioWsState, setAudioWsState] = useState<WebSocket['readyState']>(WebSocket.CLOSED);

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
      `${import.meta.env.VITE_SOCKET_URL}/video`,
      () => {
        console.log('Video WebSocket 연결 성공');
        setVideoWsState(WebSocket.OPEN);
      },
      err => {
        console.error('Video WebSocket 오류:', err);
        setVideoWsState(WebSocket.CLOSED);
      }
    );

    const audioWs = initializeWebSocket(
      `${import.meta.env.VITE_SOCKET_URL}/audio`,
      () => {
        console.log('Audio WebSocket 연결 성공');
        setAudioWsState(WebSocket.OPEN);
      },
      err => {
        console.error('Audio WebSocket 오류:', err);
        setAudioWsState(WebSocket.CLOSED);
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
          videoWsRef.current.send(event.data);
          console.log('비디오 데이터 전송');
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

  const stopStreaming = () => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.stop();
      videoRecorderRef.current = null;
      console.log('비디오 스트리밍 중지');
    }

    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
      console.log('오디오 스트리밍 중지');
    }
  };

  return (
    <div className="webcam-container">
      {loading ? (
        <div>
          <p>웹캠 상태를 확인 중...</p>
          <img
            src={babyMonitoringImage}
            alt="Baby Monitoring"
            className="w-full max-w-xs h-auto border-4 border-red-500"
          />
        </div>
      ) : isWebcamOn ? (
        <div>
          <Webcam ref={webcamRef} audio={true} videoConstraints={webcamSize} />
          <div className="controls">
            <button onClick={startStreaming}>스트리밍 시작</button>
            <button onClick={stopStreaming}>스트리밍 중지</button>
            <p>Video WebSocket 상태: {videoWsState === WebSocket.OPEN ? '열림' : '닫힘'}</p>
            <p>Audio WebSocket 상태: {audioWsState === WebSocket.OPEN ? '열림' : '닫힘'}</p>
          </div>
        </div>
      ) : (
        <p>웹캠을 사용할 수 없습니다.</p>
      )}
    </div>
  );
};

export default AutoRenderWebcam;
