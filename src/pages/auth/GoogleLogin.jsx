// ./src/pages/auth/KakoLogin.jsx

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .get(
          `https://moodfriend.site/api/v1/auth/callback/google?code=${code}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}`
        )
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data;
          console.log(accessToken, refreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/");
        })
        .catch((error) => {
          alert("로그인 중 오류가 발생했습니다.");
        });
    }
  }, [navigate, code]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default GoogleLogin;
