import BackButton from '@/components/ui/button/backButton';
import AutoRenderWebcam from '@/components/ui/webcam/AutoRenderWebcam.tsx';
import { useSearchParams } from 'react-router-dom';

const MonitorPosePage = () => {
  const [searchParams] = useSearchParams();
  const isWatcher = searchParams.get('isWatcher');

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
        <AutoRenderWebcam isWatcher={isWatcher !== 'true'} />
      </div>
    </div>
  );
};

export default MonitorPosePage;
