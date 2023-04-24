// 创建 store
import { create } from 'zustand';

const CURRENT_USER_KEY: string = 'currentUser';

interface userStore {
  user: API.UserVO | undefined;
  initUser: () => void;
  setUserInfo: (user: API.UserVO) => void;
  userLogin: (user: API.UserVO) => void;
  userLogout: () => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: undefined,
  initUser: async () => {
    let userStr = localStorage.getItem(CURRENT_USER_KEY);
    console.log('userStr', userStr);
    if (userStr !== null) {
      let json = JSON.parse(userStr) as API.UserVO;
      console.log(json);
      set(() => ({ user: json }));
    }
  },
  setUserInfo: (user: API.UserVO) => {
    set(() => ({ user: user }));
  },
  userLogin: (user: API.UserVO) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    set(() => ({ user: user }));
  },
  userLogout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    set(() => ({ user: undefined }));
  },
}));
