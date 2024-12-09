import backIcon from '@/assets/backIcon.svg'; // 뒤로가기 아이콘
import { useNavigate } from 'react-router-dom';

function InsitePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[823px] items-center w-[386px] mx-auto bg-[#f6efe9]">
      {/* 뒤로가기 버튼 */}
      <div className="w-full flex justify-start mb-4 mt-6 ml-6">
        <button onClick={() => navigate('/dash')}>
          <img src={backIcon} alt="Back Icon" className="w-8 h-8 cursor-pointer" />
        </button>
      </div>

      {/* 제목 */}
      <p className="font-bold text-lg mb-6">통계 분석</p>

      {/* 탭 메뉴 */}
      <div className="flex justify-around w-80 max-w-md mb-6">
        <button className="bg-green-300 text-white py-2 px-4 rounded-lg shadow">일별 분석</button>
        <button className="bg-gray-300 text-white py-2 px-4 rounded-lg shadow">주간 분석</button>
      </div>

      {/* 통계 데이터 영역 */}
      <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-6"></div>

      {/* 요약 */}
      <div className="w-80 max-w-md text-left">
        <p className="font-bold text-lg mb-4">요약</p>
        <div className="bg-green-100 p-3 rounded-lg mb-3">
          <p>어제에 비해 위험 행동이 2건 많았어요</p>
          <p className="text-sm text-gray-600">오늘 위험 행동 총 3건</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg mb-3">
          <p>일주일간 12-14시 사이에 운 횟수가 가장 많았어요</p>
          <p className="text-sm text-gray-600">일주일간 12건</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <p>일주일간 배고파서 가장 많이 울었어요</p>
          <p className="text-sm text-gray-600">일주일간 18건</p>
        </div>
      </div>
    </div>
  );
}

export default InsitePage;

