import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        }
      },
      kakaoLogin: () => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      }
    }),
    {
      name: "userLoginStatus"
    }
  )
);

export default useAuthStore;
