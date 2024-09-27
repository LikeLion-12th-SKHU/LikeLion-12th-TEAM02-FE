// src/api/instance.js
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: process.env.REACT_APP_REDIRECT_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 만료된 토큰에 대해 로그아웃
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      // 토큰 만료
      if (decodedToken.exp < currentTime) {
        useAuthStore.getState().logout();
        return Promise.reject(new Error("Token Expired"));
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 로그인 상태를 확인하고 안된다면 로그인창으로 이동
const setupAxiosInterceptors = (navigate) => {
  instance.interceptors.request.use(
    (config) => {
      const { isLoggedIn } = useAuthStore.getState();
      if (!isLoggedIn) {
        navigate("/auth/login");
        return Promise.reject(new Error("Unauthorized")); // 요청을 중단
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const configureAxios = (navigate) => {
  setupAxiosInterceptors(navigate);
};

export default instance;
