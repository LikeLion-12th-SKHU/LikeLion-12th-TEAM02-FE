import React, { useState, useEffect } from "react";
import axios from "axios";
import Menubar from "../components/common/Menubar";
import styled from "styled-components";
import MileageIcon from "../assets/icons/Mileage.svg";
import AngryHoyaIcon from "../assets/icons/AngryHoya.svg";
import ObjIcon from "../assets/icons/Obj.svg";
import WindowIcon from "../assets/icons/Window.svg";
import DialogIcon from "../assets/icons/Dialog.svg";
import HeartObjIcon from "../assets/icons/HeartObj.svg";

export function Main() {
  const [mileage, setMileage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMileage = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const mileage = localStorage.getItem("mileage");
          if (mileage) {
            setMileage(parseInt(mileage, 10));
          } else {
            const response = await axios.get(
              "https://moodfriend.site/api/v1/member/info",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
            const { mileage } = response.data.data;
            localStorage.setItem("mileage", mileage);
            setMileage(mileage);
          }
        } catch (error) {
          console.error("Failed to fetch mileage:", error);
          setErrorMessage("마일리지 정보를 불러올 수 없습니다.");
        }
      } else {
        console.log("No Access Token Found");
      }
    };

    fetchMileage();
  }, []);

  const handleMileageClick = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setErrorMessage("인증 토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
        return;
      }

      const response = await axios.post(
        "https://moodfriend.site/api/v1/member/attendance",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.data.success) {
        const { mileage } = response.data.data;
        setMileage(mileage);
        localStorage.setItem("mileage", mileage);
        alert("행복을 얻었어요!");
      } else {
        alert("이미 행복을 얻었어요!");
      }
    } catch (error) {
      console.error("출석 실패:", error);
      alert("이미 행복을 얻었어요!");
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "행복을 얻을 수 없습니다."
        );
      } else if (error.request) {
        setErrorMessage("서버 응답이 없습니다.");
      } else {
        setErrorMessage("요청을 처리할 수 없습니다.");
      }
    }
  };

  return (
    <Container>
      <Background>
        <Icons>
          <Icon
            src={MileageIcon}
            alt="Mileage Icon"
            onClick={handleMileageClick}
          />
          <Number>{mileage !== null ? mileage : 0}</Number>
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
        <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
        <FloorInterior>
          <RightFloorObj src={HeartObjIcon} alt="HeartObj Icon" />
        </FloorInterior>
      </Background>
      <Floor>
        <Circular></Circular>
      </Floor>
      <Menubar />
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-width: 360px;
  max-height: 932px;
  min-height: 780px;
  margin: auto;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
  background-color: ${(props) => props.theme.color.pinkColor};
`;

const Floor = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.lightPinkColor};
`;

const Interior = styled.div`
  display: flex;
  align-items: center;
  margin-top: -200px;
`;

const FloorInterior = styled.div`
  display: flex;
  align-items: center;
`;

const LeftObj = styled.img`
  width: 80px;
  height: 80px;
  margin-top: -100px;
  margin-right: 150px;
`;

const RightFloorObj = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 100px;
  position: absolute;
`;

const RightObj = styled.img`
  width: 80px;
  height: 80px;
  margin-top: -100px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  cursor: pointer;
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
  margin-bottom: 30px;
`;

const Dialog = styled.img`
  width: 150%;
  height: 100%;
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
  display: flex;
`;

const Circular = styled.button`
  width: 180px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.greenColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fff;
  font-size: 16pt;
  cursor: pointer;
`;
