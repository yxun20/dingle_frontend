import babyProfile from '@/assets/babyprofile.png'; //아기 프로필 이미지
import momProfile from '@/assets/momprofile.png'; //아기 프로필 이미지
import dadProfile from '@/assets/dadprofile.png'; //아기 프로필 이미지
import BackButton from '@/components/ui/button/backButton';

function MyPage() {
  return (
    <div
      className="flex flex-col items-center justify-around h-[823px] w-[386px] mx-auto bg-orange-50 pt-5"
      style={{ position: 'relative' }}
    >
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" className={'w-full flex justify-start pl-5'} />

      {/* 프로필 카드 3장 */}

      <div className="flex flex-col items-center justify-around h-[823px] w-[386px] p-20">
        {/* 아기 프로필 카드 */}
        <div className="w-[350px] h-1/4 max-w-md bg-white rounded-l-3xl ml-9 shadow relative pl-4 flex items-center space-x-4">
          <img src={babyProfile} className="w-[100px] h-[100px] rounded-full" alt={'profileImg'} />

          <div className="flex-grow">
            <h2 className="text-lg font-bold">딘길이</h2>
            <p className="text-sm">생후 137일</p>
            <button className="text-xs text-gray-400 mt-4" disabled>
              수정하기
            </button>
          </div>
          <button className="absolute top-2 right-2 text-gray-400">&times;</button>
        </div>

        {/* 연락처 카드 - 여자 */}
        <div className="w-[350px] h-1/4 bg-white rounded-r-3xl mr-9 shadow relative flex items-center justify-end">
          <button className="absolute top-2 left-3 text-gray-400">&times;</button>
          <div className="text-center flex flex-col items-end mr-1">
            <h3 className="text-lg font-bold">여자</h3>
            <p className="text-black text-sm">010-1234-5678</p>
            <p className="text-gray-400 text-xs">이 번호로 기업 전화가 가요</p>
            <button className="text-xs text-gray-400  mt-4" disabled>
              수정하기
            </button>
          </div>
          <img src={momProfile} className="w-[150px] h-[150px] rounded-full" alt={'profileImg'} />
        </div>

        {/* 연락처 카드 - 아빠 */}
        <div className="w-[350px] h-1/4 max-w-md bg-white rounded-l-3xl ml-9 shadow relative flex items-center ">
          <img src={dadProfile} className="w-[140px] h-[140px] ml-5 rounded-full" alt={'profileImg'} />

          <div className="text-center flex flex-col items-start mr-1">
            <h3 className="text-lg font-bold">아빠</h3>
            <p className="text-black text-sm">010-8765-4321</p>
            <p className="text-gray-400 text-xs">이 번호로 기업 전화가 가요</p>
            <button className="text-xs text-gray-400 mt-4" disabled>
              수정하기
            </button>
          </div>
          <button className="absolute top-2 right-2 text-gray-400">&times;</button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
