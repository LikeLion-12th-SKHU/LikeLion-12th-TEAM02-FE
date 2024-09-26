import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Menubar from "../../components/common/Menubar";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";
import AngryHoyaIcon from "../../assets/icons/AngryHoya.svg";
import ShopIcon from "../../assets/icons/Shop.svg";
import ObjCheckIcon from "../../assets/icons/ObjCheck.svg";
import XIcon from "../../assets/icons/X.svg";

const LeftAccessory = () => {
  const [isHeartVisible, setIsHeartVisible] = useState(true);
  const [objectNames, setObjectNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(
            "https://moodfriend.site/api/v1/object/display",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );

          // 응답 데이터 구조 확인
          console.log("API 응답 데이터:", response.data);

          // 응답 데이터에서 objectNames 추출
          const objectData = response.data.data;
          if (objectData && objectData.length > 5) {
            const names = objectData.map((obj) => obj.objectName);
            setObjectNames(names);

            // 로컬스토리지에 저장
            localStorage.setItem("objectNames", JSON.stringify(names));
          } else {
            console.error("data 배열에 오브제 정보가 없습니다.");
            setErrorMessage("서버에서 오브제 정보를 가져오지 못했습니다.");
          }
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

  const handleShopClick = () => {
    navigate("/shop");
  };

  const handleObjCheckClick = () => {
    navigate(-1);
  };

  const handleObjItemClick = () => {
    if (isHeartVisible) {
      setIsHeartVisible(false);
      // 서버에 하트 오브제 상태 업데이트 요청을 보내는 부분 추가 가능
    }
  };

  return (
    <>
      <Menubar />
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>오브제</MyText>
      </Box>
      <CenteredContainer>
        <Background>
          <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
          <FloorInterior></FloorInterior>
          <Floor>
            <Circular></Circular>
          </Floor>
        </Background>
      </CenteredContainer>
      <Container>
        <TopRow>
          <ObjCheckText>보유중</ObjCheckText>
          <ObjCheckText2>구매하기</ObjCheckText2>
          <ObjCheck onClick={handleObjCheckClick}>
            <ObjCheckImage src={ObjCheckIcon} alt="ObjCheck Icon" />
          </ObjCheck>
        </TopRow>
        <ObjItems>
          {objectNames.length > 5 ? (
            objectNames.map((name, index) => (
              <ObjItem key={index} onClick={handleObjItemClick}>
                <ObjItemCheckImage src={XIcon} alt="X Icon" />
                <Text>{name}</Text>
              </ObjItem>
            ))
          ) : (
            <ObjItemCheckImage src={XIcon} alt="X Icon" />
          )}
        </ObjItems>
        <Shop onClick={handleShopClick}>
          <ShopImage src={ShopIcon} alt="Shop Icon" />
          <ShopText>상점</ShopText>
        </Shop>
      </Container>
    </>
  );
};

export default LeftAccessory;

// 스타일 컴포넌트 정의
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  left: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const MyText = styled.span`
  font-size: 18px;
  color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40vh;
  position: relative;
  background-color: white;
  padding: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ObjCheckText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-left: 45px;
`;

const ObjCheckText2 = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-right: 65px;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding-bottom: 80%;
  background-color: ${(props) => props.theme.color.pinkColor};
  position: relative;
`;

const Floor = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.lightPinkColor};
  position: absolute;
  bottom: 0;
  left: 0;

  @media (max-width: 430px) and (max-height: 932px) {
    height: 35%;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    height: 33%;
  }
`;

const Circular = styled.img`
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.greenColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 120px;
    height: 45px;
    bottom: 80px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 110px;
    height: 40px;
    bottom: 60px;
  }
`;

const FloorInterior = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 40px;
  z-index: 3;
`;

const RightFloorObj = styled.img`
  width: 30px;
  height: 150px;
  position: relative;
  margin-left: 150px;
`;

const Character = styled.img`
  position: absolute;
  z-index: 1;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 70px;
    height: 80px;
    bottom: 100px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 60px;
    height: 70px;
    bottom: 80px;
  }
`;

const ObjItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

const ObjItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const ObjItemCheckImage = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 100px;
`;

const Shop = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background: url(${ShopIcon}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 250px;
`;

const ShopImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const ShopText = styled.span`
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  bottom: 14px;
  text-align: center;
`;

const ObjCheck = styled.div`
  cursor: pointer;
  background: url(${ObjCheckIcon}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ObjCheckImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Text = styled.span`
  font-size: 12px;
`;
