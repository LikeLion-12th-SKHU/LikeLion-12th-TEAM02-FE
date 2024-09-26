import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../api/loginInstance";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      login: () => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const isTokenValid = get().checkTokenValidity(accessToken);

          if (isTokenValid) {
            set({ isLoggedIn: true });
          } else {
            refreshAccessToken().then(() => {
              const newAccessToken = localStorage.getItem("accessToken");
              if (newAccessToken) {
                set({ isLoggedIn: true });
              } else {
                set({ isLoggedIn: false });
              }
            });
          }
        }
      },
      checkTokenValidity: (token) => {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          return decodedToken.exp > currentTime;
        } catch (error) {
          console.log("유효하지 않은 토큰");
          return false;
        }
      },

      kakaoLogin: () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
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
