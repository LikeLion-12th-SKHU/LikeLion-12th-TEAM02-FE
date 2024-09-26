// src/api/instance.js
import axios from "axios";

const loginInstance = axios.create({
  baseURL: process.env.REACT_APP_REDIRECT_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// refreshToken을 이용한 accessToken 재발급
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await loginInstance.post("api/v1/auth/renew", {
      refreshToken
    });

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    loginInstance.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  } catch (error) {
    console.error("Access token refresh failed", error);
  }
};

export default loginInstance;
