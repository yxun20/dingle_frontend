import React from 'react';
import babyCryingImage from '../assets/babyImage5.jpg';
import hungerIcon from '../assets/hungerIcon.png';
import irritationIcon from '../assets/irritationIcon.png';
import painIcon from '../assets/painIcon.png';
import sleepinessIcon from '../assets/sleepinessIcon.png';
import discomfortIcon from '../assets/discomfortIcon.png';

const Dashboard = () => {
  return (
    <div className="w-[386px] h-[823px] mx-auto pt-3 pb-5 px-5 bg-[#f6efe9] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 */}
      <div className="w-full flex justify-start mb-2">
        <button className="w-8 h-8 bg-[#edf8ec] rounded-full flex items-center justify-center cursor-pointer">←</button>
      </div>
      
      {/* 모니터링 중 텍스트 */}
      <div className="text-center mb-2">
        <p className="text-xl font-semibold">모니터링중..</p>
      </div>
      
      {/* 아기 울고 있는 이미지 */}
      <div className="text-center mb-2">
        <img src={babyCryingImage} alt="Baby Crying" className="w-full max-w-xs h-auto border-4 border-red-500" />
        <p className="text-lg font-bold mt-2">아기가 울고 있어요!</p>
      </div>
      
      {/* 울음 실시간 분석 */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-2">
        <h3 className="text-lg font-bold mb-4">울음 실시간 분석</h3>
        <div className="flex items-center mb-3">
          <div className="flex flex-col items-center mr-3">
            <img src={hungerIcon} alt="Hunger Icon" className="w-4 h-4" />
            <p className="text-xs text-center">배고픔</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-red-500 h-4 rounded-full" style={{ width: '81%' }}></div>
          </div>
          <span className="ml-3 text-sm font-semibold">81%</span>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex flex-col items-center mr-3">
            <img src={irritationIcon} alt="Irritation Icon" className="w-4 h-4" />
            <p className="text-xs text-center">짜증남</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: '17%' }}></div>
          </div>
          <span className="ml-3 text-sm font-semibold">17%</span>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex flex-col items-center mr-3">
            <img src={painIcon} alt="Pain Icon" className="w-4 h-4" />
            <p className="text-xs text-center">아픔</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: '2%' }}></div>
          </div>
          <span className="ml-3 text-sm font-semibold">2%</span>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex flex-col items-center mr-3">
            <img src={sleepinessIcon} alt="Sleepiness Icon" className="w-4 h-4" />
            <p className="text-xs text-center">졸림</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: '8%' }}></div>
          </div>
          <span className="ml-3 text-sm font-semibold">8%</span>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-3">
            <img src={discomfortIcon} alt="Discomfort Icon" className="w-4 h-4" />
            <p className="text-xs text-center">불편함</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: '5%' }}></div>
          </div>
          <span className="ml-3 text-sm font-semibold">5%</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
