import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import KakaoIcon from "../../assets/icons/Kakao.svg";
import GoogleIcon from "../../assets/icons/Google.svg";
import useAuthStore from "../../store/useAuthStore";
import loginInstance from "../../api/loginInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const { login, isLoggedIn } = useAuthStore();

  // 카카오 로그인 URL을 정의
  const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
  const K_REDIRECT_URI = "https://moodfriend.vercel.app/auth/callback/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  // 구글 로그인 URL을 정의
  const G_CLIENT_ID = process.env.REACT_APP_G_CLIENT_ID;
  const G_REDIRECT_URI = "https://moodfriend.vercel.app/auth/callback/google";
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${G_CLIENT_ID}&redirect_uri=${G_REDIRECT_URI}&response_type=code&scope=email%20profile`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginInstance.post("api/v1/auth/login", {
        email,
        password
      });

      const { accessToken, refreshToken } = response.data.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        login(); // 전역 상태 관리

        navigate("/"); // 메인 화면으로 이동
      } else {
        setErrorMessage("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("이메일 또는 비밀번호가 잘못 되었습니다.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인이 되어있으면 메인 페이지로 리디렉션
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    !isLoggedIn && (
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
              <StyledLink to="/auth/signUp">
                회원가입을 하시겠습니까?
              </StyledLink>
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
    )
  );
};

export default Login;

// 최상위 부모 요소의 width와 height를 고정
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  max-width: 430px; // 최대 너비를 430px로 설정
  min-width: 360px; // 최소 너비를 360px로 설정
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Label = styled.h1`
  margin-bottom: 60px;
  font-size: 36pt;
  text-align: center;
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  color: ${(props) => props.theme.color.primaryColor};
`;

const FormGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const InputEmail = styled.input`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-family: "Pretendard";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  border-radius: 0.5rem;
  border: 1px solid #e1e1e8;
  background: #fff;
`;

const InputPassword = styled.input`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-family: "Pretendard";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  border-radius: 0.5rem;
  border: 1px solid #e1e1e8;
  background: #fff;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1rem;
  border: none;

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
  font-size: 16px;

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
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f1f1;
  }
  &:active {
    background-color: #f1f1f1;
    transform: scale(0.98);
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const List = styled.ul`
  margin: 16px 0;
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
  font-weight: 400;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 16px 0;
`;

const DivItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
`;

const HorizontalLine = styled.div`
  width: 60px;
  height: 1px;
  background-color: ${(props) => props.theme.color.inputBoldColor};
`;

const Text = styled.div`
  font-size: 14pt;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
`;

const Error = styled.div`
  color: #dc143c;
  font-size: 14px;
  font-family: "Pretendard";
  padding: 0 4px;
  margin: 10px 0;
`;
