import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          await instance.post(
            "/api/v1/account/logout",
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
          setErrorMessage("사용자 정보를 불러올 수 없습니다.");
        }
      } else {
        console.log("액세스 토큰이 없습니다.");
      }
    };

    fetchUserData();
  }, []);

  const handleInformLink = (linkPath) => {
    navigate(linkPath);
  };

  const handleExternalLink = (linkPath) => {
    window.location.href = linkPath;
  };

  return (
    <>
      <Header title="내 정보" backLink="/" />
      <Box>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LogoText>M</LogoText>
        </Link>
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
    </>
  );
};

export default Settings;

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
  border-radius: 50%;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 120px;
    height: 120px;
    margin: 30px 10px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 100px;
    height: 100px;
    margin: 25px 10px;
  }
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

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 18px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    font-size: 16px;
  }
`;

const LogoText = styled.span`
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 30px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    font-size: 18pt;
  }
`;

const MyText = styled.span`
  font-family: Pretendard;
  margin: 10px;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 25px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    font-size: 14pt;
  }
`;

const Name = styled.span`
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    margin-left: 25px;
    font-size: 21px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    margin-left: 20px;
    font-size: 16px;
  }
`;

const Email = styled.span`
  font-family: Pretendard;
  margin-left: 20px;
  font-size: 12px;
  color: #bbbbbb;
  cursor: pointer;

  @media (max-width: 430px) and (max-height: 932px) {
    margin-left: 25px;
    font-size: 16px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    margin-left: 20px;
    font-size: 12px;
  }
`;

const SubText = styled.span`
  color: #666;
  margin-top: 5px;

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 14px;
    opacity: 70%;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    font-size: 12px;
  }
`;
