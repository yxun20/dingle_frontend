import React from 'react';
import { useNavigate } from 'react-router-dom';
import babyMonitoringImage from '../assets/babyImage3.png';

const MonitorPosePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#f6efe9] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full flex justify-start mb-5">
        <button
          className="w-8 h-8 bg-[#edf8ec] rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          ←
        </button>
      </div>

      {/* 모니터링 중 텍스트 */}
      <div className="text-center mb-5">
        <p className="text-xl font-semibold">모니터링중..</p>
      </div>

      {/* 아기 모니터링 이미지 */}
      <div className="text-center">
        <img src={babyMonitoringImage} alt="Baby Monitoring" className="w-full max-w-xs h-auto border border-black" />
      </div>
    </div>
  );
};

export default MonitorPosePage;
