// src/api/instance.js
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const instance = axios.create({
  baseURL: process.env.REACT_APP_REDIRECT_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

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
