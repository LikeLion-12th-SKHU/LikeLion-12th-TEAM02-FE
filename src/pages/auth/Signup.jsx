import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LockIcon from "../../assets/icons/Lock.svg";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); // 비밀번호 확인 표시 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("/api/v1/auth/signup", {
        email,
        password
      });
      alert("회원가입 되었습니다.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("이메일 또는 비밀번호가 잘못 되었습니다.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
