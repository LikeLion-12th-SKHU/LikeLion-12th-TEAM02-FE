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
import BlackHeartObjIcon from "../assets/icons/BlackHeartObj.svg";
import PinkHeartObjIcon from "../assets/icons/PinkHeartObj.svg";
import { useNavigate } from "react-router-dom";

export function Main() {
  const [mileage, setMileage] = useState(0);
  const [name, setName] = useState(""); // name 상태 추가
  const [objectStatuses, setObjectStatuses] = useState([false, false, false]); // objectStatuses 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
          const { mileage, name } = response.data.data;
          setMileage(mileage);
          setName(name);
          localStorage.setItem("mileage", mileage);
          localStorage.setItem("name", name);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setErrorMessage("사용자 정보를 불러올 수 없습니다.");
        }
      } else {
        console.log("No Access Token Found");
      }
    };

    fetchUserData();

    // Fetch objectStatuses from localStorage
    const savedStatuses = JSON.parse(
      localStorage.getItem("objectStatuses") || "[]"
    );
    setObjectStatuses(savedStatuses);
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

  const handleObjClick = async () => {
    try {
      console.log("오브제 화면 전환 성공");
      navigate("/object");
    } catch (error) {
      console.error("오브제 화면 전환 시도 중 오류 발생:", error);
      alert("오브제 화면 전환 시도에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const getObjectIcon = () => {
    if (objectStatuses[0]) {
      return BlackHeartObjIcon;
    } else if (objectStatuses[1]) {
      return HeartObjIcon;
    } else if (objectStatuses[2]) {
      return PinkHeartObjIcon;
    }
    return null;
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
          <Icon src={ObjIcon} alt="Obj Icon" onClick={handleObjClick} />
        </Icons>
        <Interior>
          <LeftObj src={WindowIcon} alt="Window Icon" />
          <RightObj src={WindowIcon} alt="Window Icon" />
        </Interior>
        <Chat>
          <Dialog src={DialogIcon} alt="Dialog Icon" />
          <DialogText>누가 {name} 기분을 안 좋게 했어!</DialogText>
        </Chat>
        <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
        <FloorInterior>
          <RightFloorObj src={getObjectIcon()} alt="HeartObj Icon" />
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
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-width: 360px;
  min-height: 100vh;
  margin: auto;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.pinkColor};
`;

const Floor = styled.div`
  width: 100%;
  min-height: 130px;
  max-height: 300px; /* 기본 max-height 설정 */
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
  position: relative;
`;

const Dialog = styled.img`
  width: 150%;
  height: 100%;
`;

const DialogText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  white-space: nowrap;
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
  height: 60px;
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
