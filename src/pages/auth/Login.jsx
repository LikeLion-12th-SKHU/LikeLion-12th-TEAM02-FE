// ./src/pages/auth/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import KakaoIcon from "../../assets/icons/Kakao.svg";
import GoogleIcon from "../../assets/icons/Google.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 카카오 로그인 URL을 정의
  const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
  const K_REDIRECT_URI = `https://moodfriend.site/api/v1/auth/callback/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  // 구글 로그인 URL을 정의
  const G_CLIENT_ID = process.env.REACT_APP_G_CLIENT_ID;
  const G_REDIRECT_URI = `https://moodfriend.site/api/v1/auth/callback/google`;
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${G_CLIENT_ID}&redirect_uri=${G_REDIRECT_URI}&response_type=code&scope=email%20profile`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://moodfriend.site/api/v1/auth/login",
        { email, password }
      );
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("로그인 되었습니다.");
      console.log("로그인 성공! 메인 화면으로 이동합니다."); // 디버깅 로그
      navigate("/"); // 메인 화면으로 전환
    } catch (error) {
      console.error("로그인 실패:", error); // 디버깅 로그
      setErrorMessage("이메일 또는 비밀번호가 잘못 되었습니다.");
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Mood Friend</Label>
        <FormGroup>
          <InputEmail
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </FormGroup>
        <FormGroup>
          <InputPassword
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {errorMessage && <Error>{errorMessage}</Error>}
        </FormGroup>
        <ButtonContainer>
          <Button type="submit">로그인</Button>
        </ButtonContainer>
        <List>
          <ListItem>
            <StyledLink to="/auth/signUp">회원가입</StyledLink>
          </ListItem>
        </List>
        <Div>
          <DivItem>
            <HorizontalLine />
          </DivItem>
          <DivItem>
            <Text>SNS 계정 로그인</Text>
          </DivItem>
          <DivItem>
            <HorizontalLine />
          </DivItem>
        </Div>
        <FormGroup>
          <KakaoButton onClick={handleKakaoLogin}>
            <Icon src={KakaoIcon} alt="Kakao Icon" />
            카카오로 시작하기
          </KakaoButton>
        </FormGroup>
        <FormGroup>
          <GoogleButton onClick={handleGoogleLogin}>
            <Icon src={GoogleIcon} alt="Google Icon" />
            Google로 시작하기
          </GoogleButton>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Login;

// 스타일링 코드 생략

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: auto;
  margin: auto;
`;

const Label = styled.h1`
  margin-bottom: 60px;
  font-size: 46pt;
  text-align: center;
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  color: ${(props) => props.theme.color.primaryColor};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputEmail = styled.input`
  width: 100%;
  padding: 15px 25px;
  margin: 5px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 18pt;
`;

const InputPassword = styled.input`
  width: 100%;
  padding: 15px 25px;
  margin: 5px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 18pt;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 20px 100px;
  margin: 5px;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20pt;

  &:active {
    background-color: ${(props) => props.theme.color.primaryColor};
    transform: scale(0.98);
  }
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin-top: 20px;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16pt;

  &:hover {
    background-color: #f9e300;
  }
  &:active {
    background-color: #f9e300;
    transform: scale(0.98);
  }
`;

const GoogleButton = styled(Button)`
  background-color: #ffffff;
  border: 1px solid #c5c5c5;
  color: #000000;
  padding: 15px;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16pt;

  &:hover {
    background-color: #ffffff;
  }
  &:active {
    background-color: #ffffff;
    transform: scale(0.98);
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const List = styled.ul`
  margin: 35px;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  margin: 0 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.inputColor};
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16pt;

  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivItem = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 10px;
`;

const HorizontalLine = styled.div`
  width: 110px;
  height: 1px;
  background-color: ${(props) => props.theme.color.inputBoldColor};
`;

const Text = styled.div`
  font-size: 16pt;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
`;

const Error = styled.div`
  color: red;
  font-size: 14pt;
  margin: 5px 15px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
`;

const Circular = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16pt;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryDarkColor};
  }

  &:active {
    background-color: ${(props) => props.theme.color.primaryDarkColor};
    transform: scale(0.98);
  }
`;
