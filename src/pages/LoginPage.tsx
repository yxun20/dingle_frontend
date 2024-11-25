import { useNavigate } from 'react-router-dom';
import backgroundImage from '@/assets/backgroundImage.svg'; // 새로운 배경 이미지를 import합니다.
import babyImage from '@/assets/babyImage.svg'; // 아기 이미지를 import합니다.
import crawlingBabyImage from '@/assets/crawlingBabyImage.svg'; // 아기 기어다니는 사진을 import합니다.
import sleepingBabyImage from '@/assets/sleepingBabyImage.svg'; // 아기 자는 사진을 import합니다.
import supermanBabyImage from '@/assets/supermanBabyImage.svg'; // 아기 슈퍼맨 사진을 import합니다.
import cameraIcon from '@/assets/cameraIcon.svg'; // 카메라 아이콘을 import합니다.
import myPageIcon from '@/assets/myPageIcon.svg'; // 마이페이지 아이콘을 import합니다.

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직을 여기에 추가합니다 (예: 사용자 인증)
    // 인증 성공 시 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'top center',
        position: 'relative',
      }}
    >
      {/* 상단 로고와 제목 */}
      <div className="text-center mt-10 mb-4" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-3xl font-bold">Dingle</h1>
        <p className="text-lg text-gray-500">뒹굴뒹굴 편안한 밤, 딩글이와 함께</p>
      </div>
      <div className="w-full text-center" style={{ position: 'relative', zIndex: 1 }}>
        <img src={babyImage} alt="Baby" className="w-48 h-48 mx-auto" />
      </div>
      {/* 로그인 폼 */}
      {/* 이메일 입력란 */}
      <div className="mt-4 mb-4 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      {/* 비밀번호 입력란 */}
      <div className="mb-4 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <div className="mb-6 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <button
          onClick={handleLogin}
          className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700"
        >
          로그인
        </button>
      </div>
      {/* 시작하기 링크 */}
      <div className="text-center w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          시작하기
        </a>
      </div>
    </div>
  );
}

export default LoginPage;

function MainPage() {
  const navigate = useNavigate();

  const handleFrequencyAnalysis = () => {
    navigate('/monitorFrequency');
  };

  const handlePoseDetection = () => {
    navigate('/MonitorPose');
  };

  const handleGoToDashboard = () => {
    navigate('/dash');
  };

  const handleScanPage = () => {
    navigate('/scan');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-[823px] w-[386px] mx-auto bg-green-100"
      style={{ position: 'relative' }}
    >
      {/* 상단 카메라와 마이페이지 아이콘 */}
      <div className="flex justify-between w-full p-4" style={{ position: 'absolute', top: 0 }}>
        <img src={cameraIcon} alt="Camera Icon" className="w-8 h-8 cursor-pointer" onClick={handleScanPage} />
        <img src={myPageIcon} alt="My Page Icon" className="w-8 h-8 cursor-pointer" />
      </div>

      {/* 중앙의 아기 이미지 */}
      <div className="flex justify-center items-center mt-10 mb-6">
        <img src={crawlingBabyImage} alt="Crawling Baby" className="w-64 h-64" />
      </div>

      {/* 우리 아이의 상태는? */}
      <div className="w-full bg-white rounded-t-3xl pt-8 px-6 shadow-md mt-8 mb-0" style={{ height: '100%' }}>
        <h2 className="text-xl font-bold mb-4">우리 아이의 상태는 ?</h2>

        {/* 아기 상태 카드 */}
        <div className="mb-4 p-4 bg-green-100 rounded-lg flex items-center">
          <img src={sleepingBabyImage} alt="Sleeping Baby" className="w-20 h-20 mr-4" />
          <div>
            <p className="text-lg font-semibold">아기가 새근새근 자고 있어요</p>
            <p className="text-sm text-gray-500">30분 전 배고픔 상태</p>
            <button
              onClick={handleFrequencyAnalysis}
              className="mt-2 px-4 py-1 text-sm text-green-500 border border-green-500 rounded-full bg-white"
            >
              주파수 분석중 <span>&gt;</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-red-100 rounded-lg flex items-center border-2 border-red-400 mb-4">
          <img src={supermanBabyImage} alt="Superman Baby" className="w-20 h-20 mr-4" />
          <div>
            <p className="text-lg font-semibold text-red-500">아기가 떨어질 위험이 있어보여요!</p>
            <p className="text-sm text-gray-500">아이를 확인하러 와주세요</p>
            <button
              onClick={handlePoseDetection}
              className="mt-2 px-4 py-1 text-sm text-red-500 border border-red-500 rounded-full bg-white"
            >
              자세 감지중 <span>&gt;</span>
            </button>
          </div>
        </div>
        {/* 하단 아이 보기 버튼 */}
        <button
          onClick={handleGoToDashboard}
          className="w-full py-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700"
        >
          아이 보러가기
        </button>
      </div>
    </div>
  );
}

export { MainPage };
