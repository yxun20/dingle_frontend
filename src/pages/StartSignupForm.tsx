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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, birthDate, momPhone, dadPhone });
    navigate('/');
  };

  return (
    <div
      style={{
        width: '386px',
        height: '823px',
        padding: '20px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        회원 정보 입력
      </h2>
      <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        딩글을 사용하기 위해 회원 정보를 입력해주세요
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">우리 아이 이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="우리 아이 이름"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="birthDate">우리 아이 생일</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="momPhone">엄마 전화번호</label>
          <input
            type="tel"
            id="momPhone"
            value={momPhone}
            onChange={(e) => handlePhoneInput(e, setMomPhone)}
            placeholder="010-"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="dadPhone">아빠 전화번호</label>
          <input
            type="tel"
            id="dadPhone"
            value={dadPhone}
            onChange={(e) => handlePhoneInput(e, setDadPhone)}
            placeholder="010-"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
