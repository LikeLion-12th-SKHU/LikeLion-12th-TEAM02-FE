import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menubar from "../components/common/Menubar";
import AngryHoyaIcon from "../assets/icons/AngryHoya.svg";
import HeartObjIcon from "../assets/icons/HeartObj.svg";
import WhiteBackArrowIcon from "../assets/icons/WhiteBackArrow.svg";
import PinkHeartObjIcon from "../assets/icons/PinkHeartObj.svg";
import BlackHeartObjIcon from "../assets/icons/BlackHeartObj.svg"; // 블랙 하트 오브제 아이콘 추가
import { useNavigate } from "react-router-dom";

const Object = () => {
  const [objectStatuses, setObjectStatuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStatuses = JSON.parse(
      localStorage.getItem("objectStatuses") || "[]"
    );
    setObjectStatuses(savedStatuses);
  }, []);

  const items = [
    { label: "좌측 벽", route: "/leftWall" },
    { label: "가구", route: "/furniture" },
    { label: "소파", route: "/sofa" },
    { label: "우측 벽", route: "/rightWall" },
    { label: "좌측 소품", route: "/leftAccessory" },
    { label: "협탁", route: "/sideTable" },
    { label: "장난감", route: "/toy" },
    { label: "우측 소품", route: "/rightAccessory" },
    { label: "벽지", route: "/wallpaper" },
    { label: "바닥재", route: "/flooring" },
    { label: "러그", route: "/rug" },
    { label: "선물", route: "/gift" }
  ];

  const handleItemClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <Menubar />
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate("/")} />
        <MyText>오브제</MyText>
      </Box>
      <CenteredContainer>
        <Background>
          <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
          <FloorInterior>
            {objectStatuses[0] && (
              <RightFloorObj src={BlackHeartObjIcon} alt="BlackHeartObj Icon" />
            )}
            {objectStatuses[1] && (
              <HeartObj src={HeartObjIcon} alt="HeartObj Icon" />
            )}
            {objectStatuses[2] && (
              <PinkHeartObj src={PinkHeartObjIcon} alt="PinkHeartObj Icon" />
            )}
          </FloorInterior>
          <Floor>
            <Circular></Circular>
          </Floor>
        </Background>
        <Items>
          {items.map((item, index) => (
            <Item key={index} onClick={() => handleItemClick(item.route)}>
              <ItemText>{item.label}</ItemText>
            </Item>
          ))}
        </Items>
      </CenteredContainer>
    </>
  );
};

export default Object;

// 스타일 컴포넌트 정의
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  position: relative;
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
`;

const RightFloorObj = styled.img`
  width: 30px;
  height: 150px;
  position: relative;
  margin-left: 150px;
`;

const HeartObj = styled.img`
  width: 30px;
  height: 150px;
  position: relative;
  margin-left: 150px;
`;

const PinkHeartObj = styled.img`
  width: 30px;
  height: 150px;
  position: relative;
  margin-left: 150px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  position: relative;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  position: absolute;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 80%;
    bottom: -250px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 80%;
    bottom: -220px;
  }
`;

const Item = styled.button`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;

  @media (max-width: 430px) and (max-height: 932px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 360px) and (max-height: 780px) {
    width: 70px;
    height: 70px;
  }
`;

const BackButton = styled.img`
  position: absolute;
  left: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ItemText = styled.span`
  font-size: 10px;
  color: #000000;
`;

const MyText = styled.span`
  font-size: 18px;
  color: #ffffff;
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
