// 创建 store
import { create } from 'zustand';

interface UserStore {
  user: API.UserVO | undefined;
  setUserInfo: (user: API.UserVO) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUserInfo: (user: API.UserVO) => {
    set(() => ({ user: user }));
  },
}));
