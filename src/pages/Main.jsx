import React, { useState, useEffect } from "react";
import Menubar from "../components/common/Menubar";
import styled from "styled-components";
import MileageIcon from "../assets/icons/Mileage.svg";
import AngryHoyaIcon from "../assets/icons/AngryHoya.svg";
import ObjIcon from "../assets/icons/Obj.svg";
import WindowIcon from "../assets/icons/Window.svg";
import DialogIcon from "../assets/icons/Dialog.svg";
import HeartObjIcon from "../assets/icons/HeartObj.svg";

export function Main() {
  const [mileage, setMileage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/v1/member/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setMileage(data.data.mileage);
        } else {
          console.error("API 호출 실패:", data.message);
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
        setError(error.message);
      });
  }, []); // 컴포넌트 마운트 시 호출

  return (
    <Container>
      <Background>
        <Icons>
          <Icon src={MileageIcon} alt="Mileage Icon" />
          <Number>{mileage !== null ? mileage : "?"}</Number>
          <Label>Mood Friend</Label>
          <Icon src={ObjIcon} alt="Obj Icon" />
        </Icons>
        <Interior>
          <LeftObj src={WindowIcon} alt="Window Icon" />
          <RightObj src={WindowIcon} alt="Window Icon" />
        </Interior>
        <Chat>
          <Dialog src={DialogIcon} alt="Dialog Icon" />
        </Chat>
        <CircularButton />
        <FloorInterior>
          <RightFloorObj src={HeartObjIcon} alt="HeartObj Icon" />
        </FloorInterior>
        <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
        <Floor></Floor>
      </Background>
      <Menubar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 812px;
  margin: auto;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.pinkColor};
`;

const Floor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.lightPinkColor};
`;

const Interior = styled.div`
  display: flex;
  align-items: center;
`;

const FloorInterior = styled.div`
  display: flex;
  align-items: center;
`;
const LeftObj = styled.img`
  width: 80px;
  height: 80px;
  margin-top: -550px;
  margin-right: 150px;
`;

const RightFloorObj = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 100px;
  position: absolute;
`;

const RightObj = styled.img`
  width: 25px;
  height: 25px;
  width: 80px;
  height: 80px;
  margin-top: -550px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 350px;
`;

const Chat = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const Dialog = styled.img`
  width: 220px;
  height: 170px;
  margin-top: -350px;
`;

const Label = styled.h1`
  font-size: 16pt;
  text-align: center;
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  color: ${(props) => props.theme.color.primaryColor};
  margin: 0px 55px;
`;

const Number = styled.h1`
  font-size: 16pt;
  text-align: center;
  font-family: "Baloo 2", sans-serif;
  font-weight: 800;
  color: ${(props) => props.theme.color.inputBoldColor};
`;

const Character = styled.img`
  width: 140px;
  height: 150px;
  margin-top: 100px;
  position: absolute;
`;

const CircularButton = styled.button`
  width: 180px;
  height: 80px;
  margin-top: 250px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.greenColor};
  align-items: center;
  justify-content: center;
  position: absolute;
`;
