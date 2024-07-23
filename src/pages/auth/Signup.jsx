import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LockIcon from "../../assets/icons/Lock.svg";

// Signup 컴포넌트 정의
const Signup = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부 상태
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); // 비밀번호 확인 표시 여부 상태

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
      const response = await axios.post(
        "https://moodfriend.site/api/v1/auth/signUp",
        { email, password, confirmPassword }
      );
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (response.status === 201) {
        alert("회원가입 되었습니다.");
        navigate("/"); // 홈 페이지로 이동
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Mood Friend</Label>
        <FormGroup>
          <InputLabel>이메일</InputLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>비밀번호</InputLabel>
          <InputGroup>
            <InputPassword
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <InputLabel>비밀번호 확인</InputLabel>
          <InputGroup>
            <InputPassword
              type={showPasswordCheck ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
        </ButtonContainer>
        <List>
          <ListItem>
            <StyledLink to="/auth/login">로그인</StyledLink>
          </ListItem>
        </List>
      </Form>
    </Container>
  );
};

export default Signup;

// 스타일드 컴포넌트
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

const InputLabel = styled.h1`
  margin: 25px 15px 15px;
  font-size: 14pt;
  text-align: left;
  font-family: "Pretendard";
  font-weight: 500;
  color: ${(props) => props.theme.color.inputBoldColor};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
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

const Icon = styled.img`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: ${(props) => props.opacity};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 20px 100px;
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

const Error = styled.div`
  color: red;
  font-size: 14pt;
  margin: 5px 15px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
`;
