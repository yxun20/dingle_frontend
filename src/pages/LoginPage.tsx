import backgroundImage from 'src/assets/backgroundImage.svg'; // 새로운 배경 이미지를 import합니다.
import babyImage from 'src/assets/babyImage.svg'; // 아기 이미지를 import합니다.

function LoginPage() {
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
          />
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <i className="fas fa-lock"></i>
          </span>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <div className="mb-6 w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <button className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700">
          로그인
        </button>
      </div>
      {/* 시작하기 링크 */}
      <div className="text-center w-full max-w-xs" style={{ position: 'relative', zIndex: 1 }}>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          시작하기
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
