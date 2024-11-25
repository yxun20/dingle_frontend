import backIcon from '@/assets/backIcon.svg'; // 뒤로가기 아이콘

function InsitePage() {
    return (
        <div className="flex flex-col h-[823px] w-[386px] items-center w-[386px] mx-auto bg-orange-50">
            <div className="w-full flex justify-start mb-4 mt-6 ml-6">
                <button>
                <img src={backIcon} alt="Camera Icon" className="w-8 h-8 cursor-pointer" />
                </button>
            </div>
            <p className="font-bold"> 통계 분석 </p> 

            {/*  */}
            <div className="w-80 max-w-md h-80 mt-10 bg-white shadow rounded-lg">
                
            </div>
        
            {/*  */}
            <div className="w-80 max-w-md m-10 h-60 bg-white shadow rounded-lg ">
          
            </div>

        </div>
    
  );
}

export default InsitePage;
