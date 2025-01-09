import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/ui/profile';
import babyProfile from '@/assets/babyprofile.png';
import momProfile from '@/assets/momprofile.png';
import dadProfile from '@/assets/dadprofile.png';
import BackButton from '@/components/ui/button/backButton';
import { useQuery, useMutation } from '@tanstack/react-query';
import useBabyStore from '@/store/UserInfo';
import { fetchUserData, updateUserData } from '@/services/userServices';
import BabyInfoForm from '@/components/userInfoForm';

const MyPage = () => {
  const { babyName, babyAge, momPhone, dadPhone, setBabyInfo } = useBabyStore();
  const [isEditing, setIsEditing] = useState(false);

  // React Query - Fetch User Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  // 데이터 처리
  useEffect(() => {
    if (data) {
      const { baby, parentContacts } = data;
      const calculatedDays = calculateDaysFromBirth(baby.birthDate);
      setBabyInfo({
        babyName: baby?.babyName || '아기이름',
        birthDate: baby?.birthDate || '2000-01-01',
        babyAge: `생후 ${calculatedDays}일`,
        momPhone: parentContacts?.momPhoneNumber || '긴급연락처를 적어주세요',
        dadPhone: parentContacts?.dadPhoneNumber || '긴급연락처를 적어주세요',
      });
    }
  }, [data, setBabyInfo]);

  // React Query - Update User Data
  const mutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      setIsEditing(false);
      console.log('유저 데이터 저장 성공');
    },
    onError: (error) => {
      console.error('저장 실패:', error);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    },
  });

  //데이터 변환 함수 클라이언트 상태 -> 서버 상태
  const transformDataForServer = (data: {
    babyName: string;
    birthDate: string;
    babyAge: string;
    momPhone: string;
    dadPhone: string;
  }) => {
    return {
      baby: {
        babyName: data.babyName,
        birthDate: data.birthDate,
      },
      parentContacts: {
        momPhoneNumber: data.momPhone,
        dadPhoneNumber: data.dadPhone,
      },
    };
  };
  
  const handleSave = () => {
    const zustandData = useBabyStore.getState(); // zustand 상태 가져오기
    const serverData = transformDataForServer(zustandData); // 서버 형식으로 변환
    mutation.mutate(serverData); // 변환된 데이터로 mutation 실행
  };

  const calculateDaysFromBirth = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const timeDifference = today.getTime() - birth.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference > 0 ? daysDifference : 0;
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="w-[386px] h-[823px] mx-auto pt-2 pb-4 px-4 bg-[#E8F8F5] rounded-lg flex flex-col items-center">
      <BackButton to="/" className={'w-full flex justify-start pl-4 mt-4'} />

      <div className="flex flex-col items-center justify-around p-20">
        <ProfileCard name={babyName} age={babyAge} imgSrc={babyProfile} alignment="left" />
        <ProfileCard name="엄마" phone={momPhone} imgSrc={momProfile} alignment="right" />
        <ProfileCard name="아빠" phone={dadPhone} imgSrc={dadProfile} alignment="left" />
      </div>

      <button
        className="text-sm text-blue-500 mt-auto hover:underline"
        onClick={() => setIsEditing(true)}
      >
        수정하기
      </button>

      {isEditing && <BabyInfoForm onSave={handleSave} onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default MyPage;
