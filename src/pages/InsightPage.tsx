import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from '@/components/ui/button/backButton';

// 데이터 타입 정의
interface Post {
  id: number;
  date: string;
  time: string;
  type: string;
  comment: string;
}

function InsitePage() {
  const today = new Date(); // 오늘 날짜
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const [fallsCount, setFallsCount] = useState<number>(0);
  const [chokesCount, setChokesCount] = useState<number>(0);
  const [cryingCounts, setCryingCounts] = useState<number[]>(new Array(12).fill(0));

  /* 데이터 가져오기 */
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]); // 날짜가 바뀔 때마다 데이터를 가져옴

  const fetchData = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // yyyy-MM-dd 형식
      const response = await axios.get<Post[]>(`http://localhost:3003/posts?date=${formattedDate}`);
      const data = response.data;

      const falls = data.filter((item) => item.comment === "낙상").length;
      const chokes = data.filter((item) => item.comment === "질식").length;
      const counts = calculateCryingCounts(data);

      setFallsCount(falls);
      setChokesCount(chokes);
      setCryingCounts(counts);
    } catch (error: any) {
      console.error("데이터를 가져오는 중 오류 발생:", error.message);
    }
  };

  /* 시간대별 울음 횟수 계산 함수 */
  const calculateCryingCounts = (data: Post[]): number[] => {
    const counts = new Array(12).fill(0);
    data.forEach((item) => {
      if (item.type === "울음") {
        const hour = parseInt(item.time.split(":")[0], 10);
        const index = Math.floor(hour / 2);
        counts[index] += 1;
      }
    });
    return counts;
  };

  // 날짜를 하루씩 이동
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // 날짜 형식 변환
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const isToday = selectedDate.toDateString() === today.toDateString();

  /* 차트 옵션 */
  const options1: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    title: { text: '위험 상황', align: 'center' },
    xaxis: { categories: ['낙상 위험', '질식 위험'] },
  };

  const series1 = [{ data: [fallsCount, chokesCount] }];

  const options2: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false } },
    dataLabels: { enabled: false },
    title: { text: '울음 횟수', align: 'center' },
    xaxis: { categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] },
  };

  const series2 = [{ data: cryingCounts }];

  return (
    <div className="flex flex-col w-[386px] p-5 h-[823px] items-center mx-auto bg-[#E8F8F5]">
      {/* 뒤로가기 버튼 */}
      <BackButton to="/dash" />

      {/* 제목 */}
      <p className="font-bold text-lg mb-4">통계 분석</p>

      {/* 날짜 선택 버튼 */}
      <div className="flex items-center justify-center w-80 mb-4">
    
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => changeDate(-1)} // 전날로 이동
          className="w-10 text-xl font-bold text-gray-700 hover:text-blue-500"
        >
        ◀️
        </button>

        {/* 날짜 표시 */}
        <div className="flex-grow text-center">
          <label htmlFor="datePicker" className="cursor-pointer text-lg font-bold text-gray-800">
          {formatDate(selectedDate)}
          </label>
          <input
            id="datePicker"
            type="date"
            className="hidden"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        </div>

        {/* 오른쪽 버튼 */}
        <div className="w-10">
          {!isToday && (
          <button
            onClick={() => changeDate(1)} // 다음날로 이동
            className="text-xl font-bold text-gray-700 hover:text-blue-500"
          >
          ▶️
        </button>
        )}
        </div>
      
      </div>
      {/* 통계 데이터 영역 */}
      <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-4">
        <Chart className="m-3" options={options1} series={series1} type="bar" height={150} />
      </div>
      <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-3">
        <Chart className="m-3" options={options2} series={series2} type="line" height={200} />
      </div>

      <div className="w-80 max-w-md text-left">
          <p className="font-bold text-md mb-2">요약</p>
        <div className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3">
          <p className="text-xs font-bold mb-1">일주일간 12-14시 사이에 운 횟수가 가장 많았어요</p>
          <p className="text-xs text-gray-600">일주일간 12건</p>
        </div>
        <div className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3">
          <p className="text-xs font-bold mb-1">일주일간 배고파서 가장 많이 울었어요</p>
          <p className="text-xs text-gray-600">일주일간 18건</p>
        </div>
      </div>
    </div>
  );
}

export default InsitePage;
