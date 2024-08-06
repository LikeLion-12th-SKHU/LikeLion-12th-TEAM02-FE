import React, { useState, useEffect } from "react";
import axios from "axios";
import Menubar from "../../components/common/Menubar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrowIcon from "../../assets/icons/BackArrow.svg";
import Header from "../../components/common/Header";

const EditSettings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          const { name } = response.data.data;
          setOriginalName(name);
          setName(name);
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

  const handleChangeClick = async () => {
    const confirmChange = window.confirm("수정하신 내용을 저장하시겠습니까?");
    if (confirmChange) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          await axios.patch(
            "https://moodfriend.site/api/v1/member/info/edit",
            { name },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              }
            }
          );
          alert("정보가 성공적으로 수정되었습니다.");
          navigate("/settings");
        } else {
          console.log("액세스 토큰이 없습니다.");
        }
      } catch (error) {
        console.error("수정 중 오류 발생:", error);
        alert("수정에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <>
      <Header title="내 정보 수정" backLink="/information-setting" />

      <Container>
        <BackButton src={BackArrowIcon} onClick={() => navigate(-1)} />
        <ContentWrapper>
          <Title>사용자 정보</Title>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </ContentWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={handleChangeClick}>저장하기</ConfirmButton>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </ButtonWrapper>
      </Container>
      <Menubar />
    </>
  );
};

export default EditSettings;

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

const Title = styled.span`
  font-family: "Pretendard";
  font-size: 16px;
  margin: 5px 0;
  padding-bottom: 20px;
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: "Pretendard";
  font-size: 16px;
`;

const ErrorText = styled.span`
  font-family: "Pretendard";
  color: red;
  font-size: 14px;
`;
