import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import babyMonitoringImage from '@/assets/babyImage3.png';
import { io } from 'socket.io-client';

interface AutoRenderWebcamProps {
  webcamSize?: { width: number; height: number; facingMode: string };
  isWatcher?: boolean;
}

type ExtendedWebcam = Webcam & {
  stream?: MediaStream;
};

const AutoRenderWebcam = ({ webcamSize = { width: 320, height: 400, facingMode: 'user' } }: AutoRenderWebcamProps) => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const webcamRef = useRef<ExtendedWebcam>(null);
  const videoRecorderRef = useRef<MediaRecorder | null>(null);
  const videoWsRef = useRef<any>(null);
  const audioWsRef = useRef<any>(null);

  const initializeWebSocket = (url: string, onOpen: () => void, onError: (error: Event) => void) => {
    const socket = io(url, { transports: ['websocket'] });
    socket.on('connect', onOpen);
    socket.on('error', onError);
    return socket;
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
      () => console.log('Video WebSocket 연결 성공'),
      err => console.error('Video WebSocket 오류:', err)
    );

    const audioWs = initializeWebSocket(
      `${import.meta.env.VITE_SOCKET_URL}/audio`,
      () => console.log('Audio WebSocket 연결 성공'),
      err => console.error('Audio WebSocket 오류:', err)
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

    console.log('웹캠 스트림:', stream);

    // 비디오 트랙 설정
    const videoTracks = stream.getVideoTracks();
    console.log('비디오 트랙:', videoTracks);
    if (videoTracks.length > 0) {
      const videoRecorder = new MediaRecorder(new MediaStream(videoTracks), {
        mimeType: 'video/webm; codecs=vp9',
      });

      videoRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          const message = {
            userId: 26,
            video: event.data,
          };

          videoWsRef.current.emit('video-stream', message);
          console.log('비디오 데이터 전송 완료');
        }
      };

      videoRecorder.start(1000);
      videoRecorderRef.current = videoRecorder;
    }
  };

  const captureAndSendPng = () => {
    if (!webcamRef.current) {
      console.error('웹캠 참조가 초기화되지 않았습니다.');
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      // Base64 데이터를 Blob으로 변환
      const binary = atob(screenshot.split(',')[1]);
      const array = Uint8Array.from(binary, char => char.charCodeAt(0));
      const pngBlob = new Blob([array], { type: 'image/png' });

      // Blob을 ArrayBuffer로 읽기
      const reader = new FileReader();
      reader.readAsArrayBuffer(pngBlob);

      reader.onload = () => {
        const message = {
          userId: 26,
          image: reader.result,
        };

        videoWsRef.current.emit('png', message);
      };
    } else {
      console.error('스크린샷 생성 실패');
    }
  };

  useEffect(() => {
    if (isWebcamOn) {
      setTimeout(() => startStreaming(), 5000); // 5초 후 시작

      // 일정 간격으로 PNG 캡처 및 전송
      const pngInterval = setInterval(() => {
        captureAndSendPng();
      }, 5000); // 5초 간격

      return () => clearInterval(pngInterval);
    }
  }, [isWebcamOn]);

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
        <Webcam ref={webcamRef} screenshotFormat="image/png" videoConstraints={webcamSize} />
      ) : (
        <p>웹캠을 사용할 수 없습니다.</p>
      )}
    </div>
  );
};

export default AutoRenderWebcam;
