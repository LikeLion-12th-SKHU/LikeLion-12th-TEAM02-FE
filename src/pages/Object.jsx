import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AngryHoyaIcon from "../assets/icons/AngryHoya.svg";
import HeartObjIcon from "../assets/icons/HeartObj.svg";
import Header from "../components/common/Header";
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

  const handleAlertClick = () => {
    alert("추후 출시 될 예정입니다.");
  };

  return (
    <>
      <Header title="오브제" backLink="/" />
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
            <Item key={index} onClick={() => handleAlertClick()}>
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
  flex-direction: column;
  padding: 10px;
  align-items: center;
  width: 100%;
  max-width: 430px;
  min-width: 360px;
  height: calc(100vh - 7.5vh);
  gap: 10px;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
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
`;

const Circular = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.greenColor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 120px;
  height: 60px;
`;

const FloorInterior = styled.div`
  display: flex;
  align-items: center;
  bottom: 40px;
`;

const RightFloorObj = styled.img`
  width: 30px;
  height: 150px;
`;

const HeartObj = styled.img`
  width: 30px;
  height: 150px;
  margin-left: 150px;
`;

const PinkHeartObj = styled.img`
  width: 30px;
  height: 150px;
  margin-left: 150px;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  width: 100%;
`;

const Item = styled.button`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  height: 100px;
`;

const ItemText = styled.span`
  font-size: 12px;
  color: #000000;
`;

const Character = styled.img`
  width: 120px;
  height: 130px;
  z-index: 2;
`;
