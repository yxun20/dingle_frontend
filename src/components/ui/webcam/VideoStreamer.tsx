import React, { useEffect, useRef } from 'react';

interface VideoStreamerProps {
  socketUrl: string;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ socketUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.binaryType = 'arraybuffer'; // 바이너리 데이터 수신 설정

    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;

    const handleSourceOpen = () => {
      const mimeCodec = 'video/webm; codecs="vp8, vorbis"'; // 서버에서 전송하는 코덱에 맞춤
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

    socket.onmessage = event => {
      if (sourceBufferRef.current && !sourceBufferRef.current.updating) {
        sourceBufferRef.current.appendBuffer(event.data);
      }
    };

    socket.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    socket.onerror = error => {
      console.error('WebSocket 에러:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      socket.close();
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
