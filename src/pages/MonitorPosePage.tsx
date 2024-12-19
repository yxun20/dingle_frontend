import BackButton from '@/components/ui/button/backButton';
import AutoRenderWebcam from '@/components/ui/webcam/AutoRenderWebcam.tsx';
import { useSearchParams } from 'react-router-dom';
import Video2 from '@/assets/babyVideo/gif2.gif'
import DangerIcon from '@/assets/review/icon-danger.png';
import React, { useState, useEffect } from "react";

const MonitorPosePage = () => {
  //const [searchParams] = useSearchParams();
  //const isWatcher = searchParams.get('isWatcher');

  const [isRed, setIsRed] = useState(true);

  useEffect(() => {
    // 1초마다 isRed 상태를 토글
    const interval = setInterval(() => {
      setIsRed((prev) => !prev);
    }, 500);

    // 컴포넌트 언마운트 시 타이머 제거
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" />

      {/* 모니터링 중 텍스트 */}
      <div className="text-center mb-5">
        <p className="text-xl font-semibold">모니터링중..</p>
      </div>

      {/* 아기 모니터링 이미지 */}
      <div className="text-center">
        {/*<AutoRenderWebcam isWatcher={isWatcher !== 'true'} />*/}
        <img className="w-72 h-100" src={Video2}/>
      </div>

      <div
      className={`p-4 mt-10 bg-red-100 rounded-lg flex items-center border-2 mb-4 ${
        isRed ? "border-red-400" : "border-red-100"
      }`}
    >
        <p className="text-lg font-semibold text-red-500">아기가 질식의 위험이 있어요!</p>
        
      </div>
    </div>
  );
};

export default MonitorPosePage;
