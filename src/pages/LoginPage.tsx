import { useNavigate } from 'react-router-dom';
import backgroundImage from '@/assets/backgroundImage.svg'; // 새로운 배경 이미지를 import합니다.
import babyImage from '@/assets/babyImage.svg'; // 아기 이미지를 import합니다.
import httpClient from '@/lib/client/http-client';
import { useState } from 'react';
import useTokenStore from '@/store/TokenStore'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken); // Zustand 상태 업데이트 함수

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 동작 방지(새로고침)
    
    try {
      // 서버로 로그인 요청
      console.log('서버 연결 시작 ');
      const response = await httpClient.post('/auth/login', {
        email: email,
        password: password,
        
      });
      console.log('서버 연결 성공');

      // 서버에서 받은 토큰
      const token = response.data.token;
      
      // 토큰을 로컬 스토리지에 저장
      setToken(token);

      // 유저 정보 가져오기
      const userInfoResponse = await httpClient.get('/users/me');

      const userInfo = userInfoResponse.data;

      // babyName이 비어있으면 유저 데이터 입력 화면으로 이동
      if (userInfo?.baby === null) {
        navigate('/startsignupform'); // 유저 데이터 입력 화면으로 이동\
        console.error('유저데이터 비어있음');
      } else {
        // 인증 성공 시 메인 페이지로 이동
        navigate('/');
        console.error('유저데이터 있음');
      }
    } catch (err : any) {
      console.error('로그인 요청 실패:', err.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'top center',
        position: 'relative',
      }}
    >
      {/* 상단 로고와 제목 */}
      <div className="text-center mt-10 mb-4" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-3xl font-bold">Dingle</h1>
        <p className="text-lg text-gray-500">뒹굴뒹굴 편안한 밤, 딩글이와 함께</p>
      </div>
      <div className="w-full text-center" style={{ position: 'relative', zIndex: 1 }}>
        <img src={babyImage} alt="Baby" className="w-48 h-48 mx-auto" />
      </div>
      {/* 로그인 폼 */}
      {/* 이메일 입력란 */}
      <div className="mt-4 mb-4 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      {/* 비밀번호 입력란 */}
      <div className="mb-4 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <div className="mb-6 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <button onClick={handleLogin}
          className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 mt-auto"
        >
          로그인
        </button>
      </div>
      {/* 시작하기 링크 */}
      <div className="text-center w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <a
          href="/sign"
          className="text-sm text-green-500 hover:underline "
        >
          회원가입하기
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
