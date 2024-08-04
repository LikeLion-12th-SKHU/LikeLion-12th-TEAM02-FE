import React, { useEffect, useState } from "react";
import axios from "axios";
import Menubar from "../../components/common/Menubar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrowIcon from "../../assets/icons/BackArrow.svg"; // 아이콘 import

const InformationSettings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mileage, setMileage] = useState(0);
  const [loginType, setLoginType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeClick = async () => {
    try {
      console.log("수정 시도 성공");
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
          const response = await axios.get(
            "https://moodfriend.site/api/v1/member/info",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
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
        console.log("액세스 토큰이 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Menubar />
      <Box>
        <LogoText>M</LogoText>
        <MyText>내정보</MyText>
      </Box>
      <Container>
        {" "}
        <BackButton src={BackArrowIcon} onClick={() => navigate(-1)} />
        <ContentWrapper>
          <Title>사용자 정보</Title>
          {errorMessage && <ErrorText>오류: {errorMessage}</ErrorText>}
          <Text>이메일: {email}</Text>
          <Text>이름: {name}</Text>
          <Text>마일리지: {mileage}</Text>
          <Text>로그인 타입: {loginType}</Text>
        </ContentWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={handleChangeClick}>수정하기</ConfirmButton>
        </ButtonWrapper>
      </Container>
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

const Box = styled.div`
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
`;

const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ContentWrapper = styled.div`
  padding-left: 40px;
`;

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

const Title = styled.span`
  font-size: 16px;
  margin: 5px 0;
  padding-bottom: 20px;
  font-weight: bold;
  display: block;
`;

const Text = styled.span`
  font-size: 16px;
  margin: 10px 0;
  display: block;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 16px;
`;

const LogoText = styled.span`
  font-size: 18pt;
  font-weight: bold;
  color: #ffffff; /* 글씨 색상 */
  cursor: pointer;
`;

const MyText = styled.span`
  margin: 10px;
  font-size: 18px; /* 글씨 크기 */
  color: #ffffff; /* 글씨 색상 */
  cursor: pointer;
`;
