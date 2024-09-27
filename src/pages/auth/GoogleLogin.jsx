// ./src/pages/auth/KakoLogin.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import loginInstance from "../../api/loginInstance";
import useAuthStore from "../../store/useAuthStore";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { googleLogin } = useAuthStore;

  useEffect(() => {
    if (code) {
      loginInstance
        .get(`api/v1/auth/callback/google?code=${code}`)
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          googleLogin();
          navigate("/");
        })
        .catch(() => {
          alert("로그인 중 오류가 발생했습니다.");
        });
    }
  }, [navigate, code]);

  return (
    <div className="LoginHandler">
      <Loading />
    </div>
  );
};

export default GoogleLogin;
