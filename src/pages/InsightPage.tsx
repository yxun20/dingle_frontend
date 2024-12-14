import Chart from "react-apexcharts";//그래프 라이브러리
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import BackButton from '@/components/ui/button/backButton';


function InsitePage() {

  /*{ 위험 상황 통계 }*/
  // Chart options 타입 지정
  const options1: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false, // 메뉴 버튼 숨기기
      },
    },plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },title: {
      text: '위험 상황',
      align: 'center'
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['낙상 위험', '질식 위험'],
    }
    
  };
  // Chart series 타입 지정
  const series1: { data: number[] }[] = [
    { data: [3, 5] }
  ];

  /*{ 시간별 울음 횟수 통계 }*/
  const options2: ApexOptions = {
    chart: {
    type: 'line',
    toolbar: {
      show: false, // 메뉴 버튼 숨기기
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: '울음 횟수',
    align: 'center'
  },
  xaxis: {
    categories: [0,2,4,6,8,10,12,14,16,18,20,22,24],
    labels: {
      style: {
        fontSize: "10px", // 텍스트 크기를 8px로 설정
      },
    },
  }
  };
    
  // Chart series 타입 지정
  const series2: { data: number[] }[] = [
    { data: [0,1,3,1,0,0,1,9,1,0,5,2] }
  ];

  const options3: ApexOptions = {
    chart: {
      type: "heatmap",
      height: 350,
      toolbar: {
        show: false, // 메뉴 버튼 숨기기
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"], // 단일 색상
    xaxis: {
      categories: ["월", "화", "수", "목", "금", "토", "일"], // X축 카테고리
      labels: {
        rotate: -45, // X축 라벨 기울이기
        style: {
          fontSize: "12px",
        },
      },
    },
    title: {
      text: '데이터 통신 이후 수정합니둥',
      align: 'center'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0, // 사각형 모서리
        useFillColorAsStroke: true,
      },
    },
  };
  
  const series3: { name: string; data: { x: string; y: number }[] }[] = [
    {
      name: "22-24",
      data: [
        { x: "월", y: 30 },
        { x: "화", y: 70 },
        { x: "수", y: 50 },
        { x: "목", y: 20 },
        { x: "금", y: 40 },
        { x: "토", y: 60 },
        { x: "일", y: 80 },
      ],
    },
    {
      name: "19-21",
      data: [
        { x: "월", y: 50 },
        { x: "화", y: 40 },
        { x: "수", y: 30 },
        { x: "목", y: 70 },
        { x: "금", y: 20 },
        { x: "토", y: 60 },
        { x: "일", y: 90 },
      ],
    },
    {
      name: "16-18",
      data: [
        { x: "월", y: 40 },
        { x: "화", y: 60 },
        { x: "수", y: 80 },
        { x: "목", y: 50 },
        { x: "금", y: 70 },
        { x: "토", y: 30 },
        { x: "일", y: 20 },
      ],
    },
  ];


  /*{ 일별/주간 분석 활성화 변수}*/
  const [activeTab, setActiveTab] = useState("daily");

  return ( 
    <div className="flex flex-col w-[386px] p-5 h-[823px] items-center  mx-auto bg-[#E8F8F5]">
      {/* 뒤로가기 버튼 */}
      <BackButton to="/dash" />

      {/* 제목 */}
      <p className="font-bold text-lg mb-4">통계 분석</p>

      {/* 탭 메뉴 */}
      <div className="flex justify-around w-80 max-w-md mb-4">
      <button
          className={`mr-2 w-full rounded-[15px] shadow font-bold text-sm ${
            activeTab === "daily" ? "bg-green-300 text-white" : "bg-gray-300 text-white"
          }`}
          onClick={() => setActiveTab("daily")} // 일별 분석 탭 활성화
        >
          일별 분석
        </button>
        <button
          className={`ml-2 h-9 w-full rounded-[15px] shadow font-bold text-sm  ${
            activeTab === "weekly" ? "bg-green-300 text-white" : "bg-gray-300 text-white"
          }`}
          onClick={() => setActiveTab("weekly")} // 주간 분석 탭 활성화
        >
          주간 분석
        </button>
        </div>

      {/* 통계 데이터 영역 - 일별 분석 */}
      {activeTab === "daily" && (
        <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-4">
          <Chart className="m-3" options={options1} series={series1} type="bar" height={150} />
        </div>
      )}
      {activeTab === "daily" && (
        <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-3">
          <Chart className="m-3" options={options2} series={series2} type="line" height={200} />
        </div>
      )}

      {/* 통계 데이터 영역 - 주간 분석 */}
      {activeTab === "weekly" && (
        <div className="w-80 max-w-md h-60 bg-white shadow rounded-lg mb-4">
          <Chart className="m-3" options={options3} series={series3} type="heatmap" height={150} />
        </div>
      )}

      {/* 요약 */}
      {activeTab === "daily" && (
      <div className="w-80 max-w-md text-left">
        <p className="font-bold text-md mb-2">요약</p>
        <div className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3">
          <p className="text-xs font-bold mb-1">어제에 비해 위험 행동이 2건 많았어요</p>
          <p className="text-xs text-gray-600">오늘 위험 행동 총 3건</p>
        </div>
        <div className="bg-[#AAF8B3] p-3 shadow rounded-[20px] mb-3">
          <p className="text-xs font-bold mb-1">어제에 비해 5번 더 울었어요</p>
          <p className="text-xs text-gray-600">오늘 운 횟수 14회</p>
        </div>
        </div>
      )}
        {activeTab === "weekly" && (
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
        )}
      
    </div>
  );
}

export default InsitePage;

