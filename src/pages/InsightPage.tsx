import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from '@/components/ui/button/backButton';
import "@/components/ui/datePicker.css";

interface Post {
  id: number;
  date: string;
  time: string;
  type: string;
  comment: string;
}

function InsitePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [fallsCount, setFallsCount] = useState<number>(0);
  const [chokesCount, setChokesCount] = useState<number>(0);
  const [cryingCounts, setCryingCounts] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
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

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const options1: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    title: { text: "위험 상황", align: "center" },
    xaxis: { categories: ["낙상 위험", "질식 위험"] },
  };

  const series1 = [{ data: [fallsCount, chokesCount] }];

  const options2: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    dataLabels: { enabled: false },
    title: { text: "울음 횟수", align: "center" },
    xaxis: { categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] },
  };

  const series2 = [{ data: cryingCounts }];

  return (
    <div className="flex flex-col w-[386px] p-5 h-[823px] items-center mx-auto bg-[#E8F8F5]">
      {/* 뒤로가기 버튼 */}
      <BackButton to="/dash" />

      <p className="font-bold text-lg mb-4">통계 분석</p>

      {/* 날짜 선택 */}
      <div className="flex items-center justify-center w-80 mb-4">
        <button
          onClick={() => changeDate(-1)}
          className="w-10 text-xl font-bold text-gray-700 hover:text-blue-500"
        >
          ◀️
        </button>

        <div className="flex-grow text-center">
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="yyyy년 MM월 dd일"
            calendarClassName="custom-calendar"
            customInput={
              <span className="cursor-pointer text-lg font-bold text-gray-800">
                {formatDate(selectedDate)}
              </span>
            }
          />
        </div>

        <button
          onClick={() => changeDate(1)}
          className="w-10 text-xl font-bold text-gray-700 hover:text-blue-500"
        >
          ▶️
        </button>
      </div>

      {/* 통계 데이터 */}
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
