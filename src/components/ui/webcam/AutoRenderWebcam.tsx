import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import babyMonitoringImage from '@/assets/babyImage3.png';

interface AutoRenderWebcamProps {
  webcamSize?: { width: number; height: number; facingMode: string };
}

const AutoRenderWebcam = ({ webcamSize = { width: 320, height: 400, facingMode: 'user' } }: AutoRenderWebcamProps) => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const webcamRef = useRef(null);

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
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    checkWebcamStatus();
  }, []);

  return (
    <div>
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
        <Webcam ref={webcamRef} audio={true} videoConstraints={webcamSize} />
      ) : (
        <p>웹캠을 사용할 수 없습니다.</p>
      )}
    </div>
  );
};

export default AutoRenderWebcam;
