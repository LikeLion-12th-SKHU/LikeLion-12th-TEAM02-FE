import React, { useEffect, useState } from "react";
import Menubar from "../../components/common/Menubar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";
import instance from "../../api/instance";

const InformationSettings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mileage, setMileage] = useState(0);
  const [loginType, setLoginType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeClick = async () => {
    try {
      navigate("/edit-setting");
    } catch (error) {
      console.error("수정 시도 중 오류 발생:", error);
      alert("수정 시도에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await instance.get("/api/v1/member/info", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const { email, name, mileage, loginType } = response.data.data;
          setEmail(email);
          setName(name);
          setMileage(mileage);
          setLoginType(loginType);

          // 로컬스토리지에 저장
          localStorage.setItem("mileage", mileage);
          localStorage.setItem("email", email);
          localStorage.setItem("name", name);
          localStorage.setItem("loginType", loginType);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
          setErrorMessage("사용자 정보를 불러올 수 없습니다.");
        }
      } else {
        console.error("액세스 토큰이 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header title="내 정보" backLink="/settings" />
      <Container>
        <ContentWrapper>
          {errorMessage && <ErrorText>오류: {errorMessage}</ErrorText>}
          <Text>이메일: {email}</Text>
          <Text>이름: {name}</Text>
          <Text>마일리지: {mileage}</Text>
        </ContentWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={handleChangeClick}>수정하기</ConfirmButton>
        </ButtonWrapper>
      </Container>
      <Menubar />
    </>
  );
};

export default InformationSettings;

// 스타일 컴포넌트 정의
const Container = styled.div`
  padding: 20px;
  position: relative;
  height: 100vh;
`;

const ContentWrapper = styled.div``;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 15px 0;
  margin: 15px 0;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14pt;
  border: none;

  &:active {
    background-color: ${(props) => props.theme.color.primaryColor};
    transform: scale(0.98);
  }
`;

const Text = styled.span`
  font-family: "Pretendard";
  font-size: 16px;
  margin: 10px 0;
  display: block;
`;

const ErrorText = styled.p`
  font-family: "Pretendard";
  color: red;
  font-size: 16px;
`;
