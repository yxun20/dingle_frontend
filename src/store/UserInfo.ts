import { create } from 'zustand';

interface BabyInfoState {
  babyName: string;
  birthDate: string;
  babyAge: string;
  momPhone: string;
  dadPhone: string;

  setBabyInfo: (info: Partial<BabyInfoState>) => void;
}

const useBabyStore = create<BabyInfoState>((set) => ({
  babyName: '아기이름',
  birthDate: '2000-01-01',
  babyAge: '생후 0일',
  momPhone: '긴급연락처를 적어주세요',
  dadPhone: '긴급연락처를 적어주세요',

  setBabyInfo: (info) => set((state) => ({ ...state, ...info })),
}));

export default useBabyStore;
