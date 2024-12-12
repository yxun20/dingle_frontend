import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface TokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

type TokenPersist = (config: StateCreator<TokenStore>, options: PersistOptions<TokenStore>) => StateCreator<TokenStore>;

const useTokenStore = create<TokenStore>(
  (persist as TokenPersist)(
    set => ({
      token: null,
      setToken: (token: string | null) => set({ token }),
      logout: () => {
        set({ token: null });
      },
    }),
    {
      name: 'tokenStore',
    }
  )
);
export default useTokenStore;
