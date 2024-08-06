import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menubar from "../../components/common/Menubar";
import WithdrawalIcon from "../../assets/icons/Withdrawal.svg";
import CheckIcon from "../../assets/icons/Check.svg";
import Header from "../../components/common/Header";
import instance from "../../api/instance";

const WithdrawalSettings = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [reason, setReason] = useState("");
  const [iconOpacity1, setIconOpacity1] = useState(0.4);
  const [iconOpacity2, setIconOpacity2] = useState(0.4);
  const [iconOpacity3, setIconOpacity3] = useState(0.4);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleIconClick = (iconNumber) => {
    switch (iconNumber) {
      case 1:
        setIconOpacity1((prevOpacity) => (prevOpacity === 0.4 ? 1 : 0.4));
        break;
      case 2:
        setIconOpacity2((prevOpacity) => (prevOpacity === 0.4 ? 1 : 0.4));
        break;
      case 3:
        setIconOpacity3((prevOpacity) => (prevOpacity === 0.4 ? 1 : 0.4));
        break;
      default:
        break;
    }
  };

  const handleSetValue = (e) => {
    setReason(e.target.value);
  };

  const handleConfirmWithdrawal = async () => {
    let hasError = false;

    // 아이콘 체크 및 이유 입력 검사
    if (!(iconOpacity1 === 1 && iconOpacity2 === 1 && iconOpacity3 === 1)) {
      setErrorMessage("모든 유의사항을 읽고 체크해주세요.");
      hasError = true;
    } else {
      setErrorMessage("");
    }

    if (reason.trim() === "") {
      setErrorMessage2("떠나시는 이유를 적어주세요.");
      hasError = true;
    } else {
      setErrorMessage2("");
    }

    // 에러가 없으면 API 요청
    if (!hasError) {
      const accessToken = localStorage.getItem("accessToken");
      if (window.confirm("회원탈퇴 하시겠습니까?")) {
        try {
          const response = await instance.get("/api/v1/account/withdraw", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              reason: reason
            })
          });

          if (!response.ok) {
            const errorText = await response.text(); // 응답을 텍스트로 읽음
            throw new Error(`회원탈퇴 요청 실패: ${errorText}`);
          }

          const data = await response.json();

          if (data.success) {
            alert("회원탈퇴가 완료되었습니다.");
            console.log("회원탈퇴 성공", data);
            // 회원탈퇴 후 페이지 이동
            navigate("/auth/login"); // 예를 들어, 메인 페이지로 이동
          } else {
            throw new Error(data.message || "회원탈퇴에 실패했습니다.");
          }
        } catch (error) {
          alert(error.message);
          console.error("회원탈퇴 실패", error);
        }
      }
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
          const { name } = response.data.data;
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

  return (
    <>
      <Header title="회원 탈퇴" backLink="/settings" />

      <Container>
        <ContentWrapper>
          <Title2>{name}님! </Title2>
          <Title>정말 탈퇴하시겠습니까?</Title>
          <WithdrawalWrapper>
            <WithdrawalImg
              src={WithdrawalIcon}
              alt="Withdrawal"
              style={{ opacity: iconOpacity1 }}
              onClick={() => handleIconClick(1)}
            />
            <TextWrapper>
              <SubText style={{ opacity: iconOpacity1 }}>
                서비스를 더이상 이용할 수 없습니다.
              </SubText>
            </TextWrapper>
          </WithdrawalWrapper>
          <WithdrawalWrapper>
            <WithdrawalImg
              src={WithdrawalIcon}
              alt="Withdrawal"
              style={{ opacity: iconOpacity2 }}
              onClick={() => handleIconClick(2)}
            />
            <TextWrapper>
              <SubText style={{ opacity: iconOpacity2 }}>
                대화/구매 내역은 복구되지 않습니다.
              </SubText>
            </TextWrapper>
          </WithdrawalWrapper>
          <WithdrawalWrapper>
            <WithdrawalImg
              src={CheckIcon}
              alt="Check"
              style={{ opacity: iconOpacity3 }}
              onClick={() => handleIconClick(3)}
            />
            <TextWrapper>
              <SubText style={{ opacity: iconOpacity3 }}>
                유의사항을 확인하였으며 동의합니다.
              </SubText>
            </TextWrapper>
          </WithdrawalWrapper>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <ReasonWrapper>
            <TextWrapper>
              <Text2>떠나시는 이유를 적어주세요.</Text2>
              <Textarea
                placeholder="서비스 탈퇴 사유에 대해 알려주세요.
                소중한 피드백을 담아,
                더 나은 서비스로 보답하겠습니다."
                value={reason}
                onChange={handleSetValue}
              ></Textarea>
            </TextWrapper>
          </ReasonWrapper>
          <ErrorWrapper>{errorMessage2}</ErrorWrapper>
        </ContentWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={handleConfirmWithdrawal}>
            회원탈퇴
          </ConfirmButton>
        </ButtonWrapper>
      </Container>
      <Menubar />
    </>
  );
};

export default WithdrawalSettings;

// 스타일 컴포넌트 정의

const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TextWrapper = styled.div``;

const WithdrawalWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const ReasonWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const WithdrawalImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 20vh;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 12px;
  color: #767676;
  outline: none;
`;

const Title = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  margin: 5px 0;
  padding-bottom: 20px;
  font-weight: bold;
  display: block;
`;

const Title2 = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  margin: 5px 0;
  font-weight: bold;
  display: block;
`;

const Text2 = styled.span`
  font-family: Pretendard;
  font-size: 20px;
  margin: 10px 0;
  display: block;
  font-weight: bold;
`;

const SubText = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 15px 20px;
  margin: 15px 0;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14px;
  border: none;

  &:active {
    background-color: ${(props) => props.theme.color.primaryColor};
    transform: scale(0.98);
  }
`;

const ErrorWrapper = styled.div`
  color: red;
  font-family: Pretendard;
  font-size: 14px;
  margin-top: 10px;
`;
