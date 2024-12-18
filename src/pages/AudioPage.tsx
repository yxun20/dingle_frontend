import BackButton from '@/components/ui/button/backButton';
import { AudioUploader } from '@/components/ui/button/audioUploader.tsx';

const AudioPage = () => {
  return (
    <div className="w-[386px] h-[823px] mx-auto pt-2 pb-4 px-4 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" className={'w-full flex justify-start pl-4 mt-4'} />

      {/* 제목 텍스트 */}
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">아이 울음소리 입력</p>
      </div>

      {/* 아기 이미지 */}
      <div className="text-center mb-4">
        <AudioUploader />
      </div>
    </div>
  );
};

export default AudioPage;
