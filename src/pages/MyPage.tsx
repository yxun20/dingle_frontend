import React, { useState, useEffect } from 'react';
import ProfileCard from '@/components/ui/profile';
import babyProfile from '@/assets/babyprofile.png';
import momProfile from '@/assets/momprofile.png';
import dadProfile from '@/assets/dadprofile.png';
import BackButton from '@/components/ui/button/backButton';
import httpClient from '@/lib/client/http-client';

const MyPage = () => {

  const [babyName, setBabyName] = useState('아기이름');
  const [babyAge, setBabyAge] = useState('생후 0일');
  const [momPhone, setMomPhone] = useState('긴급연락처를 적어주세요');
  const [dadPhone, setDadPhone] = useState('긴급연락처를 적어주세요');

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response =  await httpClient.post('/users/me');
        const { baby, parentContacts } = response.data;

        setBabyName(baby?.babyName || '아기이름');
        setBabyAge(baby?.birthDate || '생후 0일');
        setMomPhone(parentContacts?.momPhoneNumber || '긴급연락처를 적어주세요');
        setDadPhone(parentContacts?.dadPhoneNumber || '긴급연락처를 적어주세요');
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    ProfileData();
  }, []);

  const handleEditClick = () => {
    console.log('수정 버튼 클릭');
    // 수정 로직 또는 페이지 이동 처리
  };

  return (
    <div
      className="flex flex-col items-center justify-around h-[823px] w-[386px] mx-auto bg-[#E8F8F5] pt-5"
      style={{ position: 'relative' }}
    >
      {/* 뒤로가기 버튼 */}
      <BackButton to="/" className={'w-full flex justify-start pl-5'} />
      
      {/* 프로필 카드 섹션 */}
      <div className="flex flex-col items-center justify-around h-[823px] w-[386px] p-20">
        {/* 아기 프로필 */}
        <ProfileCard
          name={babyName}
          age={babyAge}
          imgSrc={babyProfile}
          alignment="left"
        />

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
      <button
        onClick={handleEditClick}
        className="text-sm text-blue-500 py-7 bg-transparent hover:underline"
      >
        수정하기
      </button>
    </div>
  );
};

export default MyPage;
