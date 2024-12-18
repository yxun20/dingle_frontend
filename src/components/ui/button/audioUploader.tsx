import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const AudioUploader = () => {
  const audioWsRef = useRef<any>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'audio/wav') {
      alert('오디오 파일은 WAV 형식만 지원됩니다.');
      return;
    }

    if (audioWsRef.current) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const arrayBuffer = reader.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const message = {
            userId: 26,
            wav: arrayBuffer,
          };

          audioWsRef.current.emit('cry', message);
        }
      };

      reader.onerror = () => {
        console.error('파일 읽기 실패');
      };
    } else {
      alert('오디오 WebSocket 연결이 초기화되지 않았습니다.');
    }
  };

  useEffect(() => {
    const audioSocket = io(`${import.meta.env.VITE_SOCKET_URL}/audio`, { transports: ['websocket'] });
    audioWsRef.current = audioSocket;

    audioSocket.on('connect', () => console.log('Audio WebSocket 연결 성공'));

    return () => {
      audioSocket.close();
      audioWsRef.current = null;
    };
  }, []);

  return (
    <div>
      <div onClick={handleClick}>
        <button className="pt-5 px-3 w-[320px] h-[400px] flex place-content-center place-items-center no-underline text-white text-xl font-bold bg-green-400 rounded-xl">
          +
        </button>

        <input
          ref={fileRef}
          id="file"
          name="file"
          type="file"
          accept={'audio/wav'}
          onChange={handleChange}
          style={{
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
};
