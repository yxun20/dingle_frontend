import babyMonitoringImage from '../assets/babyImage3.png';
import BackButton from '@/components/ui/button/backButton';

const MonitorPosePage = () => {

  return (
    <div className="w-[386px] h-[823px] mx-auto p-5 bg-[#f6efe9] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to='/'></BackButton>

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
