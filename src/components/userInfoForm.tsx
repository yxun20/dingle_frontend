import React from 'react';
import useBabyStore from '@/store/UserInfo';

interface BabyInfoFormProps {
  onSave: () => void;
  onClose: () => void;
}

const BabyInfoForm: React.FC<BabyInfoFormProps> = ({ onSave, onClose }) => {
  const { babyName, birthDate, momPhone, dadPhone, setBabyInfo } = useBabyStore();

  const handleChange = (key: string, value: string) => {
    setBabyInfo({ [key]: value });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
      <h2 className="text-lg font-bold mb-4">정보 수정</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">우리 아이 이름</label>
          <input
            type="text"
            id="name"
            value={babyName}
            onChange={(e) => handleChange('babyName', e.target.value)}
            placeholder="우리 아이 이름"
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-sm font-medium">우리 아이 생일</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="momPhone" className="block text-sm font-medium">엄마 전화번호</label>
          <input
            type="tel"
            id="momPhone"
            value={momPhone}
            onChange={(e) => handleChange('momPhone', e.target.value)}
            placeholder="010-"
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dadPhone" className="block text-sm font-medium">아빠 전화번호</label>
          <input
            type="tel"
            id="dadPhone"
            value={dadPhone}
            onChange={(e) => handleChange('dadPhone', e.target.value)}
            placeholder="010-"
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
        >
          취소
        </button>
        <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          저장
        </button>
      </div>
    </div>
    </div>
  );
};

export default BabyInfoForm;
