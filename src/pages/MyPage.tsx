import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/ui/profile';
import babyProfile from '@/assets/babyprofile.png';
import momProfile from '@/assets/momprofile.png';
import dadProfile from '@/assets/dadprofile.png';
import BackButton from '@/components/ui/button/backButton';
import httpClient from '@/lib/client/http-client';

const MyPage = () => {
  const [babyName, setBabyName] = useState('아기이름');
  const [birthDate, setBirthDate] = useState('2000-01-01'); //서버에서 가져오눈 날짜 데이터
  const [babyAge, setBabyAge] = useState('생후 0일'); //계산한 애기 나이

  const [momPhone, setMomPhone] = useState('긴급연락처를 적어주세요');
  const [dadPhone, setDadPhone] = useState('긴급연락처를 적어주세요');
  const [isEditing, setIsEditing] = useState(false); // 수정 모달 표시 상태

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await httpClient.get('/users/me');
        const { baby, parentContacts } = response.data;

        setBabyName(baby?.babyName || '아기이름');
        setBirthDate(baby?.birthDate || '2000-01-01');

        const calculatedDays = calculateDaysFromBirth(baby.birthDate);
        setBabyAge(`생후 ${calculatedDays}일`);

        setMomPhone(parentContacts?.momPhoneNumber || '긴급연락처를 적어주세요');
        setDadPhone(parentContacts?.dadPhoneNumber || '긴급연락처를 적어주세요');
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchProfileData();
  }, []);

  //아기 나이 계산 함수
  const calculateDaysFromBirth = (birthDate: string) => {
    const birth = new Date(birthDate); // baby.birthDate를 Date 객체로 변환
    const today = new Date(); // 현재 날짜
    const timeDifference = today.getTime() - birth.getTime(); // 밀리초 차이 계산
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일 수 계산
    return daysDifference > 0 ? daysDifference : 0; // 음수 방지
  };

  const handleEditClick = () => {
    setIsEditing(true); // 모달 열기
  };

  const handleSave = async () => {
    const requestBody = {
      baby: {
        babyName: babyName,
        birthDate: birthDate,
      },
      parentContacts: {
        momPhoneNumber: momPhone,
        dadPhoneNumber: dadPhone,
      },
    };
    try {
      // POST 요청으로 데이터 전송
      const response = await httpClient.put('/users/me', requestBody);
      console.log('유저데이터 저장 성공:', response.data);
    } catch (error) {
      console.error('서버 연결 실패 :', error);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
      console.log('수정 데이터 저장:', { babyName, birthDate, momPhone, dadPhone });
    }
    console.log('수정 데이터 저장:', { babyName, birthDate, momPhone, dadPhone });
    setIsEditing(false); // 모달 닫기
  };

  const handleClose = () => {
    setIsEditing(false); // 모달 닫기
  };

  return (
    <div className="w-[386px] h-[823px] mx-auto pt-2 pb-4 px-4 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      {/* 뒤로가기 버튼 컴포넌트 to='이동할 페이지'*/}
      <BackButton to="/" className={'w-full flex justify-start pl-4 mt-4'} />

      {/* 프로필 카드 섹션 */}
      <div className="flex flex-col items-center justify-around p-20">
        {/* 아기 프로필 */}
        <ProfileCard name={babyName} age={babyAge} imgSrc={babyProfile} alignment="left" />

        {/* 엄마 프로필 */}
        <ProfileCard
          name="엄마"
          phone={momPhone}
          description="이 번호로 긴급 전화가 가요"
          imgSrc={momProfile}
          alignment="right"
        />

        {/* 아빠 프로필 */}
        <ProfileCard
          name="아빠"
          phone={dadPhone}
          description="이 번호로 긴급 전화가 가요"
          imgSrc={dadProfile}
          alignment="left"
        />
      </div>

      {/* 수정 버튼 */}
      <button onClick={handleEditClick} className="text-sm text-blue-500 mt-auto hover:underline">
        수정하기
      </button>

      {/* 수정 모달 */}
      {isEditing && (
        <div className="w-[390px] h-[823px] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">정보 수정</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  우리 아이 이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={babyName}
                  onChange={e => setBabyName(e.target.value)}
                  placeholder="우리 아이 이름"
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="birthDate" className="block text-sm font-medium">
                  우리 아이 생일
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="momPhone" className="block text-sm font-medium">
                  엄마 전화번호
                </label>
                <input
                  type="tel"
                  id="momPhone"
                  value={momPhone}
                  onChange={e => setMomPhone(e.target.value)}
                  placeholder="010-"
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dadPhone" className="block text-sm font-medium">
                  아빠 전화번호
                </label>
                <input
                  type="tel"
                  id="dadPhone"
                  value={dadPhone}
                  onChange={e => setDadPhone(e.target.value)}
                  placeholder="010-"
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
              >
                취소
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
