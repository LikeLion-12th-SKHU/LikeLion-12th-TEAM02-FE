import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LockIcon from "../../assets/icons/Lock.svg";
import instance from "../../api/instance";

// Signup 컴포넌트 정의
const Signup = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [email, setEmail] = useState(""); // 이메일 상태
  const [code, setCode] = useState(""); // 인증코드 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부 상태
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); // 비밀번호 확인 표시 여부 상태
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 관리
  const [showTimer, setShowTimer] = useState(false); // 타이머 보이게 할지 여부
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부
  const [isVerfied, setIsVerified] = useState(false); // 이메일 인증 완료 여부
  const [isLoading, setIsLoading] = useState(false); // 이메일 전송 로딩 여부
  const [isDisabled, setIsDisabled] = useState(false); // 모든 버튼 비활성화

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,16}$/;
    return re.test(password);
  };

  // 인증메일 보내기 버튼
  const sendVerificationEmail = async () => {
    setIsLoading(true); // 로딩
    try {
      const response = await instance.post("api/v1/auth/email-send", { email });
      if (response.status === 200) {
        setIsEmailSent(true);
        startTimer();
      }
      alert("메일에 인증코드를 보냈습니다.");
    } catch (error) {
      setErrorMessage("이메일 전송 실패");
    } finally {
      setIsLoading(false); // 버튼 활성화
    }
  };

  // 이메일 인증
  const verifyEmail = async () => {
    try {
      const response = await instance.post("api/v1/auth/email-verify", {
        email,
        code
      });
      if (response.status === 200) {
        setIsVerified(true); // 이메일 인증 완료
        setShowTimer(false); // 타이머 숨기기
        setTimeLeft(0);
        setIsDisabled(true);
        alert("이메일 검증이 완료되었습니다.");
      }
    } catch (error) {
      setErrorMessage("이메일 검증 실패");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setErrorMessage(""); // 오류 메시지 초기화

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setErrorMessage("유효한 이메일 주소를 입력하세요.");
      return;
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
      setErrorMessage(
        "비밀번호는 10자 이상 16자 이하, 영문자, 숫자 및 특수문자를 포함해야 합니다."
      );
      return;
    }

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 서버에 회원가입 요청
      const signupResponse = await instance.post("api/v1/auth/signUp", {
        email,
        password,
        confirmPassword
      });

      if (signupResponse.status === 201) {
        // 로그인 요청
        const loginResponse = await instance.post("api/v1/auth/login", {
          email,
          password
        });

        const { accessToken, refreshToken } = loginResponse.data.data;

        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        alert("회원가입 완료!");
        navigate("/auth/login"); // 홈 페이지로 이동
      }
    } catch (error) {
      // 서버 응답에 따른 오류 메시지 설정
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          setErrorMessage("이미 존재하는 이메일입니다.");
        } else if (status === 400) {
          setErrorMessage(data.message || "잘못된 요청입니다.");
        } else if (status === 403) {
          setErrorMessage("접근이 거부되었습니다. 관리자에게 문의하세요.");
        } else if (status === 500) {
          setErrorMessage("서버 오류. 관리자에게 문의하세요.");
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        setErrorMessage("네트워크 오류가 발생했습니다.");
      }
    }
  };

  // 비밀번호 표시 토글 함수
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 확인 표시 토글 함수
  const toggleShowPasswordCheck = () => {
    setShowPasswordCheck((prev) => !prev);
  };

  // 로그인 창으로 이동하는 함수
  const handleClick = () => {
    navigate("/auth/login");
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // 5분 타이머 작동
  const startTimer = () => {
    setTimeLeft(300);
    setShowTimer(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Mood Friend</Label>
        <FormGroup>
          <EmailVeri>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
              autoComplete="your_email"
              disabled={isDisabled}
            />
            <EmailVeriBtn
              type="button"
              onClick={sendVerificationEmail}
              disabled={isLoading || isDisabled}
            >
              {isLoading ? "인증 중..." : "인증"}
            </EmailVeriBtn>
          </EmailVeri>
        </FormGroup>

        {isEmailSent && (
          <FormGroup>
            <EmailVeri>
              <Input
                type="text"
                value={code}
                placeholder="인증코드"
                required
                onChange={(e) => setCode(e.target.value)}
                disabled={isDisabled}
              />
              <EmailVeriBtn
                w="180px"
                type="button"
                onClick={verifyEmail}
                disabled={isLoading || isDisabled}
              >
                이메일 인증
              </EmailVeriBtn>
            </EmailVeri>
            {showTimer && (
              <Timer>
                <b>{formatTime()}</b> 내로 인증해야합니다. <br />
                메일이 가지 않은 경우 다시 인증 버튼을 눌러주세요.
              </Timer>
            )}

            {isVerfied && (
              <VerifiedMessage>이메일 인증이 완료되었습니다.</VerifiedMessage>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <InputGroup>
            <InputPassword
              type={showPassword ? "text" : "password"}
              value={password}
              required
              autoComplete="your_password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Icon
              src={LockIcon}
              alt="Lock Icon"
              onClick={toggleShowPassword}
              opacity={showPassword ? 0.4 : 1}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputPassword
              type={showPasswordCheck ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="your_confirmPassword"
              placeholder="비밀번호 확인"
            />
            <Icon
              src={LockIcon}
              alt="Lock Icon"
              onClick={toggleShowPasswordCheck}
              opacity={showPasswordCheck ? 0.4 : 1}
            />
          </InputGroup>
          {errorMessage && <Error>{errorMessage}</Error>}
        </FormGroup>
        <ButtonContainer>
          <Button type="submit">회원가입</Button>
          <Button type="submit" onClick={handleClick} bgColor="#756AB680">
            로그인으로 돌아가기
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Signup;

// 스타일드 컴포넌트
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  max-width: 430px;
  min-width: 360px;
  width: 100%;
  padding: 60px 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Label = styled.h1`
  margin-bottom: 40px;
  font-size: 36pt;
  text-align: center;
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  color: ${(props) => props.theme.color.primaryColor};
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #e1e1e8;
  background: #fff;
  padding: 0.875rem 1.5rem;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e1e1e8;
  background: #fff;
  gap: 10px;
  box-sizing: border-box;
`;

const InputPassword = styled.input`
  width: 100%;
  border: none;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1rem;
  padding: 0;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  opacity: ${(props) => props.opacity};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 15px 0;
  background-color: ${(props) =>
    props.bgColor || props.theme.color.primaryColor};
  color: #ffffff;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 16px;
  border: none;

  &:active {
    background-color: ${(props) => props.theme.color.primaryColor};
    transform: scale(0.98);
  }
`;

const Error = styled.div`
  color: #dc143c;
  font-size: 14px;
  font-family: "Pretendard";
  padding: 0 4px;
  margin: 10px 0;
`;

const EmailVeri = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

const EmailVeriBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.w || "80px"};
  height: 49px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => props.theme.color.primaryColor};
  border-radius: 0.5rem;

  &:disabled {
    background: "#cccccc";
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Timer = styled.p`
  color: #dc143c;
  font-size: 14px;
  font-family: "Pretendard";
  padding: 0 4px;
  margin: 10px 0;
`;

const VerifiedMessage = styled.p`
  color: #009000;
  font-size: 14px;
  font-family: "Pretendard";
  padding: 0 4px;
  margin: 10px 0;
`;
