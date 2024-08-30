import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menubar from "../../components/common/Menubar";
import FrontArrowIcon from "../../assets/icons/FrontArrow.svg";
import FeedbackIcon from "../../assets/icons/Feedback.svg";
import UserInformIcon from "../../assets/icons/UserInform.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";
import WithdrawalIcon from "../../assets/icons/Withdrawal.svg";
import ProfileIcon from "../../assets/icons/Profile.svg";
import styled from "styled-components";
import axios from "axios";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          await axios.post(
            "https://moodfriend.site/api/v1/account/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            }
          );
        }
      } catch (error) {
        console.error("로그아웃 처리 중 오류 발생:", error);
        alert("로그아웃 처리에 실패했습니다. 다시 시도해 주세요.");
      } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("loginType");
        navigate("/auth/login");
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
          const { email, name } = response.data.data;
          setEmail(email);
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
      <Menubar />
      <Box>
        <LogoText>M</LogoText>
        <MyText>내정보</MyText>
        <ProfileSection>
          <ProfileImage src={ProfileIcon} alt="Profile" />
          <ProfileInfo>
            <Name>{name}</Name>
            <Email>{email}</Email>
          </ProfileInfo>
        </ProfileSection>
      </Box>
      <Container>
        <Link to="/information-setting">
          <LinkWrapper>
            <InformationImg src={UserInformIcon} alt="UserInform" />
            <TextWrapper>
              <Text>사용자 정보</Text>
              <SubText>사용자의 정보를 조회할 수 있습니다.</SubText>
            </TextWrapper>
            <Img src={FrontArrowIcon} alt="FrontArrow" />
          </LinkWrapper>
        </Link>
        <Separator />
        <FeedbackWrapper
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
        </FeedbackWrapper>
        <Separator />
        <LogoutWrapper onClick={handleLogoutClick}>
          <LogoutImg src={LogoutIcon} alt="Logout" />
          <TextWrapper>
            <Text>로그아웃</Text>
            <SubText>일시적으로 계정을 나갈 수 있습니다.</SubText>
          </TextWrapper>
          <Img src={FrontArrowIcon} alt="FrontArrow" />
        </LogoutWrapper>
        <Separator />
        <Link to="/Withdrawal-setting">
          <WithdrawalWrapper>
            <WithdrawalImg src={WithdrawalIcon} alt="Withdrawal" />
            <TextWrapper>
              <Text>회원탈퇴</Text>
              <SubText>영구적으로 계정을 지울 수 있습니다.</SubText>
            </TextWrapper>
            <Img src={FrontArrowIcon} alt="FrontArrow" />
          </WithdrawalWrapper>
        </Link>
      </Container>
    </>
  );
};

export default Settings;

// 스타일 컴포넌트 정의
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-width: 360px;
  height: 75vh;
  margin: auto;
`;

const Box = styled.div`
  height: 25vh;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: white;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px 5px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditProfile = styled.span`
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FeedbackWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const WithdrawalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
`;

const FeedbackImg = styled.img`
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

const InformationImg = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 0 0 0 -50px;
`;

const LogoutImg = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const WithdrawalImg = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  opacity: 40%;
  margin: 0;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InformTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedbackTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: 16px;
  color: #333;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-size: 18pt;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
`;

const MyText = styled.span`
  margin: 10px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
`;

const Name = styled.span`
  margin-left: 20px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

const Email = styled.span`
  margin-left: 20px;
  font-size: 12px;
  color: #bbbbbb;
  cursor: pointer;
`;

const SubText = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;
