// 创建 store
import { create } from 'zustand';

interface userStore {
  user: API.UserVO | undefined;
  setUserInfo: (user: API.UserVO) => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: undefined,
  setUserInfo: (user: API.UserVO) => {
    set(() => ({ user: user }));
  },
}));
