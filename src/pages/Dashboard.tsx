import { useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import babySleepingImage from '../assets/babyImage2.svg';
import moonSleepingImage from '../assets/sleepingMoonImage.svg';
import BackButton from '@/components/ui/button/backButton';
import RecordButton from '@/assets/dashboardButton/recordButton.svg';
import RecordButtonActive from '@/assets/dashboardButton/recordButtonActive.svg';
import SongButton from '@/assets/dashboardButton/songButton.svg';
import SongButtonActive from '@/assets/dashboardButton/songButtonActive.svg';
import httpClient from '@/lib/client/http-client';
import music from '@/assets/music/good-night-melody-piano-245836.mp3'
import axios from 'axios';
import CustomScrollbar from '@/components/ui/CustomScrollbar';

// 데이터 타입 정의
interface Post {
  id: number;
  date: string;
  time: string;
  type: string;
  comment: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRecording(false);
    setIsPlaying(false);
  };

  
  const today = new Date(); // 오늘 날짜

  /* 데이터 가져오기 */
  useEffect(() => {
    fetchData(today);
  }, []); // 날짜가 바뀔 때마다 데이터를 가져옴

  const fetchData = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // yyyy-MM-dd 형식
      const response = await axios.get<Post[]>(`http://localhost:3003/posts?date=${formattedDate}`);
      const data = response.data;


      
    } catch (error: any) {
      console.error("데이터를 가져오는 중 오류 발생:", error.message);
    }
  };

  //녹음 기능
  const handleRecordClick = async () => {
    
    setIsModalOpen(true);
    // 상태 토글
    setIsRecording((prev) => !prev);
  };

  //음악 기능
  const audioRef = useRef(new Audio(music));
  const handleSongClick = () => {
    setIsModalOpen(true);
    if (isPlaying) {
      // 노래 정지
      console.log('노래 재생 정지');
      audioRef.current.pause();
    } else {
      // 노래 재생
      console.log('노래 재생 시작');
      audioRef.current.play(); // 음악 재생
    }
    // 상태 토글
    setIsPlaying((prev) => !prev);
  };


  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#E8F8F5] rounded-lg relative">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지' */}
      <BackButton to="/" />

      <div className="text-center mb-5">
        <img src={babySleepingImage} alt="Baby Sleeping" className="w-full h-auto rounded-lg" />
      </div>
       {/* 녹음 버튼 및 노래 버튼 */}
       <div className="flex justify-center mb-5">
        <button
          className="w-[45%] drop-shadow-lg m-1 mr-4"
          onClick={handleRecordClick}
        >
          <img className="w-full" src={isRecording ? RecordButtonActive : RecordButton} />
        </button>
        <button
          className="w-[45%] drop-shadow-lg m-1 ml-4"
          onClick={handleSongClick}
        >
          <img className="w-full" src={isPlaying ? SongButtonActive : SongButton} />
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[300px] p-5 rounded-lg shadow-lg">
            <p className="text-center text-lg font-bold mb-4">
              추가 기능 개발 중입니다.
            </p>
            <button
              className="block mx-auto bg-[#50A65D] text-white px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              확인
            </button>
          </div>
        </div>
      )}
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
        <CustomScrollbar height="160px">
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔<span className="text-xs text-gray-600">1분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span className="text-xs text-gray-600">31분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 트름 <span className="text-xs text-gray-600">57분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 불편함 <span className="text-xs text-gray-600">1시간 2분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span className="text-xs text-gray-600">2시간 10분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 불편함 <span className="text-xs text-gray-600">3시간 23분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span className="text-xs text-gray-600">5시간 47분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔 <span className="text-xs text-gray-600">7시간 29분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔<span className="text-xs text-gray-600">8시간 40분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 복통<span className="text-xs text-gray-600">9시간 12분 전</span></li>
              </CustomScrollbar>
      </div>

      {/* 알림 임시 창 */}
      {showAlerts && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-[350px] bg-white p-5 rounded-lg shadow-lg h-[600px]">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">전체 알림</h3>
              <button
                className="text-sm text-gray-500 cursor-pointer"
                onClick={() => setShowAlerts(false)}
              >
                닫기
              </button>
            </div>
            <CustomScrollbar height="500px">
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔<span className="text-xs text-gray-600">1분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 뒤집혔어요 <span className="text-xs text-gray-600">31분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 트름 <span className="text-xs text-gray-600">57분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 불편함 <span className="text-xs text-gray-600">1시간 2분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span className="text-xs text-gray-600">2시간 10분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 불편함 <span className="text-xs text-gray-600">3시간 23분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">프레임 주위로 갔어요 <span className="text-xs text-gray-600">5시간 47분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔 <span className="text-xs text-gray-600">7시간 29분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 배고픔<span className="text-xs text-gray-600">8시간 40분 전</span></li>
              <li className="bg-green-200 p-3 mb-3 rounded-lg flex justify-between">아이가 울고 있어요 - 복통<span className="text-xs text-gray-600">9시간 12분 전</span></li>
            </CustomScrollbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
