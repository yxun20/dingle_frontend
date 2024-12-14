import React from 'react';
import ProfileCard from '@/components/ui/profile';
import babyProfile from '@/assets/babyprofile.png';
import momProfile from '@/assets/momprofile.png';
import dadProfile from '@/assets/dadprofile.png';
import BackButton from '@/components/ui/button/backButton';

const MyPage: React.FC = () => {
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
          name="딩글이"
          age="생후 137일"
          imgSrc={babyProfile}
          alignment="left"
        />

        {/* 엄마 프로필 */}
        <ProfileCard
          name="엄마"
          phone="010-1234-5678"
          description="이 번호로 긴급 전화가 가요"
          imgSrc={momProfile}
          alignment="right"
        />

        {/* 아빠 프로필 */}
        <ProfileCard
          name="아빠"
          phone="010-8765-4321"
          description="이 번호로 긴급 전화가 가요"
          imgSrc={dadProfile}
          alignment="left"
        />
      </div>
    </div>
  );
};

export default MyPage;