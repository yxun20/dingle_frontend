import hungerIcon from '../assets/hungerIcon.png';
import irritationIcon from '../assets/irritationIcon.png';
import painIcon from '../assets/painIcon.png';
import sleepinessIcon from '../assets/sleepinessIcon.png';
import discomfortIcon from '../assets/discomfortIcon.png';

import BackButton from '@/components/ui/button/backButton';
import useCryStore from '@/store/CryStore.ts';

const MonitorFrequencyPage = () => {
  const { cryDataList } = useCryStore();

  const isEmpty = cryDataList.length === 0;
  const lastCryData = cryDataList[cryDataList.length - 1];

  return (
    <div className="w-[386px] h-[823px] mx-auto pt-3 pb-5 px-5 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" />

      {/* 모니터링 중 텍스트 */}
      <div className="text-center mb-2">
        <p className="text-xl font-semibold">울음소리 분석</p>
      </div>

      {isEmpty ? (
        <div>
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-2">
            <p className="text-xl font-bold mb-4">현재 아이가 울고 있지 않아요!</p>
            <p className="text-sm">아이가 울고 있을 때 분석된 데이터가 여기에 표시해드릴게요.</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-2">
            <p className="text-xs font-bold mb-4">울음 실시간 분석</p>
            <div className="flex items-center mb-3">
              <div className="flex flex-col items-center mr-3">
                <img src={hungerIcon} alt="Hunger Icon" className="w-4 h-4" />
                <p className="text-xs text-center">배고픔</p>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: lastCryData.hungry }}></div>
              </div>
              <span className="ml-3 text-sm font-semibold">{lastCryData.hungry}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="flex flex-col items-center mr-3">
                <img src={irritationIcon} alt="Irritation Icon" className="w-4 h-4" />
                <p className="text-xs text-center">짜증남</p>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: lastCryData.trim }}></div>
              </div>
              <span className="ml-3 text-sm font-semibold">{lastCryData.trim}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="flex flex-col items-center mr-3 w-8">
                <img src={painIcon} alt="Pain Icon" className="w-4 h-4" />
                <p className="text-xs text-center">아픔</p>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: lastCryData.stomachache }}></div>
              </div>
              <span className="ml-3 text-sm font-semibold">{lastCryData.stomachache}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="flex flex-col items-center mr-3 w-8">
                <img src={sleepinessIcon} alt="Sleepiness Icon" className="w-6 h-6" />
                <p className="text-xs text-center">졸림</p>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: lastCryData.tired }}></div>
              </div>
              <span className="ml-3 text-sm font-semibold">{lastCryData.tired}</span>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center mr-3 w-8">
                <img src={discomfortIcon} alt="Discomfort Icon" className="w-6 h-6" />
                <p className="text-xs text-center">불편함</p>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: lastCryData.discomfort }}></div>
              </div>
              <span className="ml-3 text-sm font-semibold">{lastCryData.discomfort}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorFrequencyPage;
