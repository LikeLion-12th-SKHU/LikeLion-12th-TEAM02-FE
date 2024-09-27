import React, { useState, useEffect } from "react";
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
import instance from "../api/instance";
import useAuthStore from "../store/useAuthStore";

export function Main() {
  const [mileage, setMileage] = useState(0);
  const [name, setName] = useState(""); // name 상태 추가
  const [objectStatuses, setObjectStatuses] = useState([false, false, false]); // objectStatuses 상태 추가

  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await instance.get("api/v1/member/info", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const { mileage, name } = response.data.data;
          setMileage(mileage);
          setName(name);
          localStorage.setItem("mileage", mileage);
          localStorage.setItem("name", name);
        } catch (error) {
          logout();
          console.error("Failed to fetch user data:", error);
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

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("엑세스토큰이 없습니다.");
        return;
      }

      const response = await instance.post(
        "api/v1/member/attendance",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.data.status === 200) {
        const { mileage } = response.data.data;
        setMileage(mileage);
        localStorage.setItem("mileage", mileage);
        alert("행복을 얻었어요!");
      } else if (response.data.status === 409) {
        alert("이미 행복을 얻었어요!");
      }
    } catch (error) {
      alert("이미 행복을 얻었어요!");
      if (error.response) {
        console.log(error.response.data.message || "행복을 얻을 수 없습니다.");
      } else if (error.request) {
        console.log("서버 응답이 없습니다.");
      } else {
        console.log("요청을 처리할 수 없습니다.");
      }
    }
  };

  const handleObjClick = async () => {
    try {
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
    <>
      <Container>
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
        <Background>
          <TopSection>
            <Interior>
              <LeftObj src={WindowIcon} alt="Window Icon" />
              <RightObj src={WindowIcon} alt="Window Icon" />
            </Interior>
            <Chat>
              <Dialog src={DialogIcon} alt="Dialog Icon" />
              <DialogText> 누가 {name} 화나게했어!</DialogText>
            </Chat>
          </TopSection>

          <BottomSection>
            {/* <FloorInterior>
              <RightFloorObj src={getObjectIcon()} alt="HeartObj Icon" />
            </FloorInterior> */}
            <Floor>
              <Character src={AngryHoyaIcon} alt="AngryHoya Icon" />
              <Circular></Circular>
            </Floor>
          </BottomSection>
        </Background>
      </Container>
      <Menubar />
    </>
  );
}

// 스타일 정의
const Container = styled.div`
  max-width: 430px;
  min-width: 360px;
  height: calc(100vh - 16vh);
  background-color: ${(props) => props.theme.color.pinkColor};
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Floor = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.lightPinkColor};
`;

const Interior = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FloorInterior = styled.div`
  display: flex;
  align-items: center;
`;

const LeftObj = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 150px;
`;
const RightObj = styled.img`
  width: 80px;
  height: 80px;
`;

const RightFloorObj = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 100px;
  position: absolute;
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
  justify-content: center;
  height: 8vh;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 30px;
  position: relative;
`;

const Dialog = styled.img``;

const DialogText = styled.h2`
  font-family: "Pretendard";
  position: absolute;
  top: 40%;
  color: #000000;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
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
  position: absolute;
  top: -35%;
  width: 140px;
  height: 150px;
  display: flex;
`;

const Circular = styled.div`
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
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
`;

const BottomSection = styled.div`
  width: 100%;
  height: 40%;
`;
