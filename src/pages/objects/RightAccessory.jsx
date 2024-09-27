import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Menubar from "../../components/common/Menubar";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";
import AngryHoyaIcon from "../../assets/icons/AngryHoya.svg";
import ShopIcon from "../../assets/icons/Shop.svg";
import ObjCheckIcon from "../../assets/icons/ObjCheck.svg";
import HeartIcon from "../../assets/icons/HeartObj.svg";
import instance from "../../api/instance";

const RightAccessory = () => {
  const [objectNames, setObjectNames] = useState([]);
  const [clickedObject, setClickedObject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await instance.get("/api/v1/object/owned/display", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          const objectData = response.data.data;
          if (objectData && objectData.length > 0) {
            const names = objectData.map((obj) => obj.objectName);
            setObjectNames(names);

            localStorage.setItem("objectNames", JSON.stringify(names));
          } else {
            setErrorMessage("서버에서 오브제 정보를 가져오지 못했습니다.");
          }
        } catch (error) {
          setErrorMessage("사용자 정보를 불러올 수 없습니다.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleItemClick = (name) => {
    setClickedObject((prev) => (prev === name ? null : name)); // 같은 오브제를 두 번 클릭 시 토글
  };

  const handleShopClick = () => {
    navigate("/shop");
  };

  const handleObjCheckClick = () => {
    navigate(-1);
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
          <FloorInterior>
            {clickedObject && (
              <HeartImage src={HeartIcon} alt="Pink Heart Icon" />
            )}
          </FloorInterior>
          <Floor>
            <Circular></Circular>
          </Floor>
        </Background>
      </CenteredContainer>
      <Container>
        <TopRow>
          <ObjCheckText>보유중</ObjCheckText>
          <ObjCheck onClick={handleObjCheckClick}>
            <ObjCheckImage src={ObjCheckIcon} alt="ObjCheck Icon" />
          </ObjCheck>
        </TopRow>
        <ObjItems>
          {objectNames.length > 0 ? (
            objectNames.map((name, index) => (
              <ObjItem key={index} onClick={() => handleItemClick(name)}>
                <HeartImage src={HeartIcon} alt="Heart Icon" />
                <Text>{name}</Text>
              </ObjItem>
            ))
          ) : (
            <Text>오브제 정보가 없습니다.</Text>
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

export default RightAccessory;

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90%;
  padding: 10px;
`;

const ObjItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

  @media (max-width: 360px) {
    padding: 20px;
  }
`;

const HeartImage = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 5px;
`;
