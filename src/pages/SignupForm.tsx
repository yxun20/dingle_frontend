import React, { useState } from 'react';
import httpClient from '@/lib/client/http-client';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    

    try {
      // 서버로 회원가입 요청
      const response = await httpClient.post('/auth/register', {
        email: formData.email,
        username: formData.name,
        password: formData.password,
      });
      if (response.status === 200) {
        console.log('폼 제출 완료:', response.data);
        alert('회원가입 성공!');
      }
      // 인증 성공 시 메인 페이지로 이동
      navigate('/login');
      
    } catch (err) {
      console.log(err);
      alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
    }

  };

  return (
    <div className="w-[386px] h-[823px] mx-auto bg-white rounded-lg shadow-lg flex flex-col justify-between p-6">
      <div>
        <h1 className="text-xl font-bold mb-2">회원가입</h1>
        <p className="text-gray-500 mb-4">계정을 만들고 딩글을 시작해보세요</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@email.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="비밀번호 입력"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="비밀번호 재확인"
            />
          </div>

          {/* 규정 동의 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="agreedToTerms" className="ml-2 text-sm text-gray-700">
              저는 <span className="text-green-500">규정안내</span>를 숙지하였으며 <span className="text-green-500">동의합니다</span>.
            </label>
          </div>
        </form>
      </div>

      {/* 제출 Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 mt-auto"
      >
        계정 생성하기
      </button>
    </div>
  );
};

export default SignupForm;