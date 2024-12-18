import sleepingBabyImage from '@/assets/sleepingBabyImage.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCryStore from '@/store/CryStore.ts';

const buttonWording = {
  default: '아기가 새근새근 자고 있어요',
  hungry: '아기가 배고파요',
  discomfort: '아기가 불편해요',
  trim: '아기가 트림 중이에요',
  stomachache: '아기가 복통이 있어요',
  tired: '아기가 피곤해요',
};

const convertToColumn = (data: any) => {
  return {
    createdAt: new Date(),
    stomachache: data.data['복통'],
    trim: data.data['트림'],
    discomfort: data.data['불편함'],
    hungry: data.data['배고픔'],
    tired: data.data['피로'],
    type: data.data['predicted_class'],
  };
};

export const CryCard = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [minutes, setMinutes] = useState(0);

  const { cryDataList, setCryData } = useCryStore();

  useEffect(() => {
    // SSE 연결 초기화
    const eventSource = new EventSource(`${import.meta.env.VITE_SSE_URL}/alarm/get-cry-alerts`);

    // 서버에서 메시지를 수신할 때
    eventSource.onmessage = event => {
      const newMessage = event.data;
      const messageData = JSON.parse(newMessage);

      setMessage(messageData.type);
      setCryData([...cryDataList, convertToColumn(messageData)]);
    };

    // 서버에서 에러 발생 시
    eventSource.onerror = err => {
      console.error('SSE 연결 오류:', err);
      eventSource.close();
    };

    // 컴포넌트 언마운트 시 연결 닫기
    return () => {
      eventSource.close();
    };
  }, []);

  const isEmpty = cryDataList.length === 0;
  const lastCryData = cryDataList[cryDataList.length - 1];

  useEffect(() => {
    if (!isEmpty) {
      const now = new Date();
      const lastCryTime = new Date(lastCryData.createdAt);
      const diff = now.getTime() - lastCryTime.getTime();
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setMinutes(minutes);
    }
  }, []);

  return (
    <div className="mb-4 p-4 bg-green-100 rounded-lg flex items-center">
      <img src={sleepingBabyImage} alt="Sleeping Baby" className="w-20 h-20 mr-4" />
      <div>
        <p className="text-lg font-semibold">{message === '' ? buttonWording.default : buttonWording[message]}</p>
        <p className="text-sm text-gray-500">
          {message === '' && !isEmpty ? `${minutes}분전 ${lastCryData.type} 상태` : '아이를 확인하러 와주세요'}
        </p>
        <button
          className="mt-2 px-4 py-1 text-sm text-green-500 border border-green-500 rounded-full bg-white"
          onClick={() => navigate('/monitor-frequency')}
        >
          주파수 분석중 <span>&gt;</span>
        </button>
      </div>
    </div>
  );
};
