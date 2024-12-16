import httpClient from '@/lib/client/http-client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [momPhone, setMomPhone] = useState('010-');
  const [dadPhone, setDadPhone] = useState('010-');
  const navigate = useNavigate();

  const handlePhoneInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPhone: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력받음
    if (value.startsWith('010')) {
      value = value.substring(3); // '010'을 제외한 부분만 포맷팅
    }

    if (value.length <= 3) {
      setPhone(`010-${value}`);
    } else if (value.length <= 7) {
      setPhone(`010-${value.substring(0, 3)}-${value.substring(3)}`);
    } else {
      setPhone(
        `010-${value.substring(0, 4)}-${value.substring(4, 8)}` // 최대 4자리씩 표시
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, birthDate, momPhone, dadPhone });
    const requestBody = {
      baby: {
        babyName: name,
        birthDate: birthDate,
      },
      parentContacts: [
        {
          momPhoneNumber: momPhone,
          dadPhoneNumber: dadPhone,
        },
      ],
    };
     try {
      // POST 요청으로 데이터 전송
      const response = await httpClient.post('/users/me', requestBody);
      console.log('유저데이터 저장 성공:', response.data);

      // 성공 시 페이지 이동
      navigate('/');
    } catch (error) {
      console.error('서버 연결 실패 :', error);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  
  };

    // 버튼 활성화 여부 결정
    const isFormValid =
    name.trim() !== "" &&
    birthDate.trim() !== "" &&
    momPhone.replace(/[^0-9]/g, "").length === 11 &&
    dadPhone.replace(/[^0-9]/g, "").length === 11;

  return (
    <div className="w-[386px] h-[823px] p-6 mx-auto border border-gray-300 rounded-lg shadow-lg flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-2">회원 정보 입력</h2>
        <p className="text-sm text-gray-500 mb-5">
          딩글을 사용하기 위해 회원 정보를 입력해주세요
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              우리 아이 이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setBirthDate(e.target.value)}
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
              onChange={(e) => handlePhoneInput(e, setMomPhone)}
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
              onChange={(e) => handlePhoneInput(e, setDadPhone)}
              placeholder="010-"
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full py-3 rounded-md shadow-md mt-auto focus:outline-none ${
          isFormValid
            ? "bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default SignupForm;
