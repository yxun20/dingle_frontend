import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type CryData = {
  createdAt: Date;
  stomachache: string; //'0.24%'
  trim: string; //'2.33%'
  discomfort: string; //'21.78%'
  hungry: string; //'75.61%'
  tired: string; // '0.04%'
  type: string; // 'hungry'
};

interface CryStore {
  cryDataList: CryData[];
  setCryData: (data: any) => void;
}

type CryPersist = (config: StateCreator<CryStore>, options: PersistOptions<CryStore>) => StateCreator<CryStore>;

const useCryStore = create<CryStore>(
  (persist as CryPersist)(
    set => ({
      cryDataList: [],
      setCryData: cryData => set({ cryDataList: cryData }),
    }),
    {
      name: 'cryStore',
    }
  )
);
export default useCryStore;
