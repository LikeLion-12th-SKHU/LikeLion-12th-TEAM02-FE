import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menubar from "../../components/common/Menubar";
import FrontArrowIcon from "../../assets/icons/FrontArrow.svg";
import FeedbackIcon from "../../assets/icons/Feedback.svg";
import UserInformIcon from "../../assets/icons/UserInform.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";
import WithdrawalIcon from "../../assets/icons/Withdrawal.svg";
import ProfileIcon from "../../assets/icons/Profile.svg";
import styled from "styled-components";
import Header from "../../components/common/Header";
import instance from "../../api/instance";
import useAuthStore from "../../store/useAuthStore";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleLogoutClick = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await instance.post("/api/v1/account/logout", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response);
      } catch (error) {
        console.error("로그아웃 처리 중 오류 발생:", error);
      } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("loginType");
        logout();
        navigate("/auth/login");
      }
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
          const { email, name } = response.data.data;
          setEmail(email);
          setName(name);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      } else {
        console.error("액세스 토큰이 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <SettingContainer>
      <Header title="내 정보" backLink="/" />
      <Box>
        <ProfileImage src={ProfileIcon} alt="Profile" />
        <ProfileInfo>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </ProfileInfo>
      </Box>
      <Container>
        <StyledWrapper as={Link} to="/information-setting">
          <InformationImg src={UserInformIcon} alt="UserInform" />
          <TextWrapper>
            <Text>사용자 정보</Text>
            <SubText>사용자의 정보를 조회할 수 있습니다.</SubText>
          </TextWrapper>
          <Img src={FrontArrowIcon} alt="FrontArrow" />
        </StyledWrapper>
        <Separator />
        <StyledWrapper
          as="a"
          href="https://open.kakao.com/o/sSeRtsGg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FeedbackImg src={FeedbackIcon} alt="Feedback" />
          <FeedbackTextWrapper>
            <Text>개발자 피드백</Text>
            <SubText>개발자에게 피드백을 할 수 있습니다.</SubText>
          </FeedbackTextWrapper>
          <Img src={FrontArrowIcon} alt="FrontArrow" />
        </StyledWrapper>
        <Separator />
        <StyledWrapper as="div" onClick={handleLogoutClick}>
          <LogoutImg src={LogoutIcon} alt="Logout" />
          <TextWrapper>
            <Text>로그아웃</Text>
            <SubText>일시적으로 계정을 나갈 수 있습니다.</SubText>
          </TextWrapper>
          <Img src={FrontArrowIcon} alt="FrontArrow" />
        </StyledWrapper>
        <Separator />
        <StyledWrapper as={Link} to="/Withdrawal-setting">
          <WithdrawalImg src={WithdrawalIcon} alt="Withdrawal" />
          <TextWrapper>
            <Text>회원탈퇴</Text>
            <SubText>영구적으로 계정을 지울 수 있습니다.</SubText>
          </TextWrapper>
          <Img src={FrontArrowIcon} alt="FrontArrow" />
        </StyledWrapper>
      </Container>
      <Menubar />
    </SettingContainer>
  );
};

export default Settings;

const SettingContainer = styled.div`
  max-width: 430px;
  min-width: 360px;
  height: calc(100vh - 8vh);
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Box = styled.div`
  height: 10rem;
  padding: 20px;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  margin: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  gap: 1rem;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
`;

const InformationImg = styled.img`
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 30px;
    height: 30px;
  }
`;

const FeedbackImg = styled.img`
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 25px;
    height: 25px;
  }
`;

const LogoutImg = styled.img`
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 30px;
    height: 30px;
  }
`;

const WithdrawalImg = styled.img`
  cursor: pointer;
  opacity: 40%;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 30px;
    height: 30px;
  }
`;

const Img = styled.img`
  margin-left: 10px;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 35px;
    height: 35px;
    margin-left: 15px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 25px;
    height: 25px;
    margin-left: 10px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const FeedbackTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Text = styled.span`
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
`;

const Name = styled.span`
  color: #ffffff;

  font-size: 20px;
  font-family: Pretendard;
`;

const Email = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  color: #bbbbbb;
  font-size: 16px;
`;

const SubText = styled.span`
  color: #666;
  margin-top: 5px;
  font-size: 14px;
  opacity: 70%;
  font-family: Pretendard;
`;
