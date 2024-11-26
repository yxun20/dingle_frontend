import { useNavigate } from 'react-router-dom';
import babySleepingImage from '../assets/babyImage2.svg';
import moonSleepingImage from '../assets/sleepingMoonImage.svg';
import micIcon from '../assets/cameraIcon.svg';
import musicIcon from '../assets/musicIcon.svg';
import BackButton from '@/components/ui/button/backButton';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#f6efe9] rounded-lg">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" />

      <div className="text-center mb-5">
        <img src={babySleepingImage} alt="Baby Sleeping" className="w-full h-auto rounded-lg" />
      </div>
      <div className="flex justify-between mb-5">
        <button className="flex flex-col items-center bg-[#a8dfb9] text-white p-4 rounded-lg w-[45%] cursor-pointer">
          <img src={micIcon} alt="Mic Icon" className="w-8 h-8 mb-2" />
          <p className="text-center text-xl font-bold">마이크 켜기</p>
          <p className="text-center text-sm">아이와 소통하세요</p>
        </button>
        <button className="flex flex-col items-center bg-[#a8dfb9] text-white p-4 rounded-lg w-[45%] cursor-pointer">
          <img src={musicIcon} alt="AI Music Icon" className="w-8 h-8 mb-2" />
          <p className="text-center text-xl font-bold">AI 노래 자동 재생</p>
          <p className="text-center text-sm">상황에 맞게 노래를 재생해요</p>
        </button>
      </div>
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 shadow-md mb-5">
        <img src={moonSleepingImage} alt="Sleeping Moon" className="w-24 h-24" />
        <div className="flex flex-col items-start">
          <p className="text-lg mb-2">
            우리 아이의 오늘 하루
            <br />
            <span className="text-green-500">8시간 34분</span> 잔 것 같아요
          </p>
          <button
            className="bg-[#a8dfb9] border-none py-2 px-5 rounded-lg cursor-pointer"
            onClick={() => navigate('/insight')}
          >
            통계 분석 보러가기
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">우리 아이 최근 활동</h3>
          <button className="text-sm text-gray-500 cursor-pointer">전체 보기</button>
        </div>
        <ul className="list-none p-0">
          <li className="bg-[#e0f3eb] p-3 mb-3 rounded-lg flex justify-between">
            아이가 울고 있어요 <span>1분 전</span>
          </li>
          <li className="bg-[#e0f3eb] p-3 mb-3 rounded-lg flex justify-between">
            아이가 뒤집혔어요 <span>31분 전</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
