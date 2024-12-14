import BackButton from '@/components/ui/button/backButton';
import AutoRenderWebcam from '@/components/ui/webcam/AutoRenderWebcam.tsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[386px] h-[823px] mx-auto pt-2 pb-4 px-4 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" className={'w-full flex justify-start pl-4 mt-4'} />

      {/* 제목 텍스트 */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">아이 모니터링 카메라 설치</p>
      </div>

      {/* 아기 이미지 */}
      <div className="text-center mb-8">
        <AutoRenderWebcam />
      </div>

      {/* 안내 텍스트 */}
      <div className="w-full max-w-md text-center text-md font-semibold mb-6">
        <p className="mb-2">! 침대 프레임이 나오도록 촬영해주세요</p>
        <p>! 아기가 화면 안에 다 나오게 해주세요</p>
      </div>

      {/* 모니터링 시작하기 버튼 */}
      <button
        className="bg-green-400 text-white py-3 px-6 rounded-lg shadow-md w-full mx-5 font-bold mt-6 mb-2"
        onClick={() => navigate('/monitor-pose')}
      >
        모니터링 시작하기
      </button>
    </div>
  );
};

export default Dashboard;
