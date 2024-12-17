import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

interface VideoStreamerProps {
  socketUrl: string;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ socketUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const socketRef = useRef<any>(null); // socket.io client reference

  useEffect(() => {
    const socket = io(socketUrl, {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;

    const handleSourceOpen = () => {
      const mimeCodec = 'video/webm; "codecs=vp9, vorbis"'; // 서버에서 전송하는 코덱에 맞춤
      if (MediaSource.isTypeSupported(mimeCodec)) {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        sourceBufferRef.current = sourceBuffer;

        sourceBuffer.addEventListener('updateend', () => {
          // 버퍼가 비었을 때 데이터 추가 준비 완료
          console.log('SourceBuffer update completed');
        });
      } else {
        console.error('MIME codec not supported:', mimeCodec);
      }
    };

    mediaSource.addEventListener('sourceopen', handleSourceOpen);

    socket.on('connect', () => {
      console.log('Socket.io 연결 성공');
      // 사용자 ID 전송
      socket.emit('init', { userId: 26 });
    });

    socket.on('video-stream', (message: any) => {
      try {
        const { userId: senderId, data } = message;

        if (senderId === 26 && sourceBufferRef.current && !sourceBufferRef.current.updating) {
          // 데이터 추가
          const binaryData = new Uint8Array(data).buffer; // `data`는 ArrayBuffer 형태로 가정
          sourceBufferRef.current.appendBuffer(binaryData);
        }
      } catch (err) {
        console.error('메시지 처리 오류:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket.io 연결 종료');
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl]);

  useEffect(() => {
    if (videoRef.current && mediaSourceRef.current) {
      videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);
      videoRef.current.play().catch(err => console.error('비디오 재생 오류:', err));
    }
  }, []);

  return <video ref={videoRef} autoPlay controls muted className="w-full h-auto" />;
};

export default VideoStreamer;
