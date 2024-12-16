import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import babySleepingImage from '../assets/babyImage2.svg';
import moonSleepingImage from '../assets/sleepingMoonImage.svg';
import BackButton from '@/components/ui/button/backButton';
import RecordButton from '@/assets/dashboardButton/recordButton.svg';
import RecordButtonAvtive from '@/assets/dashboardButton/recordButtonActive.svg';
import SongButton from '@/assets/dashboardButton/songButton.svg';
import SongButtonActive from '@/assets/dashboardButton/songButtonActive.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#E8F8F5] rounded-lg relative">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지' */}
      <BackButton to="/" />

      <div className="text-center mb-5">
        <img src={babySleepingImage} alt="Baby Sleeping" className="w-full h-auto rounded-lg" />
      </div>
      <div className="flex justify-center mb-5">
        <button className="w-[45%] drop-shadow-lg m-1 mr-4">
          <img className="w-full" src={RecordButton} />
        </button>
        <button className="w-[45%] drop-shadow-lg m-1 ml-4">
          <img className="w-full" src={SongButton} />
        </button>
      </div>
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 shadow-md mb-5">
        <img src={moonSleepingImage} alt="Sleeping Moon" className="w-24 h-24" />
        <div className="flex flex-col items-start">
          <p className="text-lg mb-2">
            우리 아이의 오늘 하루
            <br />
            <span className="text-green-500">배고파서</span> 많이 울었어요
          </p>
          <button
            className="bg-[#AAF8B3] border-none py-2 px-5 rounded-lg cursor-pointer"
            onClick={() => navigate('/insight')}
          >
            통계 분석 보러가기
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">우리 아이 최근 활동</h3>
          <button
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => setShowAlerts(true)}
          >
            전체 보기
          </button>
        </div>
        <ul className="list-none p-0 h-40 overflow-y-scroll">
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>1분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span>31분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>57분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>1시간 2분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span>2시간 10분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>3시간 23분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span>5시간 47분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>7시간 29분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>8시간 40분 전</span></li>
          <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>9시간 12분 전</span></li>
        </ul>
      </div>

      {/* 알림 임시 창 */}
      {showAlerts && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[350px] bg-white p-5 rounded-lg shadow-lg overflow-y-scroll max-h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">전체 알림</h3>
              <button
                className="text-sm text-gray-500 cursor-pointer"
                onClick={() => setShowAlerts(false)}
              >
                닫기
              </button>
            </div>
            <ul className="list-none p-0">
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>1분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span>31분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>57분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>1시간 2분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span>2시간 10분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>3시간 23분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span>5시간 47분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>7시간 29분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>8시간 40분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 <span>9시간 12분 전</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
