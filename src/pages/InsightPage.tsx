import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from '@/components/ui/button/backButton';
import "@/components/ui/datePicker.css";
import warningIcon from '@/assets/review/icon-danger.png';
import cryingIcon from '@/assets/review/icon-baby-cry.png';

//일별 로그 데이터
interface Post {
  id: number;
  date: string;
  time: string;
  type: string;
  comment: string;
}
//요약 데이터
interface Review {
  id: number;
  date: string;
  comment: Comment[];
}

interface Comment {
  id: number;
  content: string;
  tip: string;
}

function InsitePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [fallsCount, setFallsCount] = useState<number>(0);
  const [chokesCount, setChokesCount] = useState<number>(0);
  const [cryingCounts, setCryingCounts] = useState<number[]>(new Array(12).fill(0));

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];

      //통계 데이터 불러오기 
      const response = await axios.get<Post[]>(`http://localhost:3003/posts?date=${formattedDate}`);
      const data = response.data;

      const falls = data.filter((item) => item.comment === "낙상").length;
      const chokes = data.filter((item) => item.comment === "질식").length;
      const counts = calculateCryingCounts(data);

      setFallsCount(falls);
      setChokesCount(chokes);
      setCryingCounts(counts);

      //요약 데이터 불러오기 
      const response2 = await axios.get<Review[]>(`http://localhost:3003/reviews?date=${formattedDate}`);
      const data2 = response2.data;

      // 가져온 데이터를 상태에 저장
      setReviews(data2);
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

  const series1 = [{ data: [fallsCount, chokesCount] }];

  // 데이터에서 최대값 계산
  const maxValue = Math.max(...series1[0].data);

  const options1: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    title: { text: "위험 상황", align: "center" },
    xaxis: {
      categories: ["낙상 위험", "질식 위험"],
      min: 0, // x축 시작 값
      max: maxValue, // x축 끝 값 (데이터 범위에 맞게 설정)
      tickAmount: maxValue, // 눈금 개수 (0, 1, 2, 3, 4)
      labels: {
        formatter: (value) => Math.round(Number(value)).toString(), // 정수로 변환
      },
    },
  };
  
  

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


      <div className="w-80 h-100 max-w-md text-left">
        <p className="font-bold text-md mb-2">요약</p>
        {reviews.map((review) => (
          <div key={review.id}>

          <div key={review.comment[0].id} className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3 flex items-center">
            
            <img src={warningIcon} className="w-6 h-6 mr-3 ml-1"/>
            <div>
              <p className="text-xs font-bold mb-1">{review.comment[0].content}</p>
              <p className="text-xs text-gray-600">{review.comment[0].tip}</p>
            </div>
          </div>

          <div key={review.comment[1].id} className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3 flex items-center">
            <img src={cryingIcon} className="w-6 h-6 mr-3 ml-1"/>
            <div>
              <p className="text-xs font-bold mb-1">{review.comment[1].content}</p>
              <p className="text-xs text-gray-600">{review.comment[1].tip}</p>
            </div>
          </div>
        
      </div>
    ))}
      </div>
    </div>
  );
}

export default InsitePage;
