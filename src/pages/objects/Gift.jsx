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
import HeartObjIcon from "../../assets/icons/HeartObj.svg";
import PinkHeartObjIcon from "../../assets/icons/PinkHeartObj.svg";
import BlackHeartObjIcon from "../../assets/icons/BlackHeartObj.svg";

const Gift = () => {
  const [objectNames, setObjectNames] = useState([]);
  const [objectStatuses, setObjectStatuses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
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

          console.log("API 응답 데이터:", response.data); // 응답 데이터 확인

          const objectData = response.data.data;
          if (objectData && objectData.length > 0) {
            const names = objectData.map((obj) => obj.objectName);
            const statuses = objectData.map((obj) => obj.isVisible);
            setObjectNames(names);
            setObjectStatuses(statuses);

            localStorage.setItem("objectNames", JSON.stringify(names));
            localStorage.setItem("objectStatuses", JSON.stringify(statuses));
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

  useEffect(() => {
    // 로컬 스토리지에서 상태를 복원
    const savedStatuses = JSON.parse(
      localStorage.getItem("objectStatuses") || "[]"
    );
    if (savedStatuses.length === 0) {
      setObjectStatuses([false, false, false]); // 초기화
    } else {
      setObjectStatuses(savedStatuses);
    }
  }, []);

  const handleShopClick = () => {
    navigate("/shop");
  };

  const handleObjCheckClick = () => {
    if (selectedIndex !== null) {
      if (selectedIndex === 0) {
        // 인덱스가 0일 때, objectStatuses를 [true, false, false]로 설정
        const updatedStatuses = [true, false, false];
        setObjectStatuses(updatedStatuses);
        localStorage.setItem("objectStatuses", JSON.stringify(updatedStatuses));
        navigate("/object");
      } else {
        // 인덱스가 0이 아닌 경우의 동작
        const updatedStatuses = objectStatuses.map((status, index) =>
          index === selectedIndex ? status : false
        );
        setObjectStatuses(updatedStatuses);
        localStorage.setItem("objectStatuses", JSON.stringify(updatedStatuses));
        navigate("/object");
      }
    }
  };

  const handleObjItemClick = (index) => {
    // 인덱스가 0일 때, 모든 오브제 비활성화
    if (index === 0) {
      const updatedStatuses = [true, false, false]; // 인덱스 0만 활성화
      setObjectStatuses(updatedStatuses);
      localStorage.setItem("objectStatuses", JSON.stringify(updatedStatuses));
      setSelectedIndex(0); // 인덱스 0을 선택된 인덱스로 설정
    } else {
      // 인덱스가 0이 아닌 경우, 선택된 오브제만 활성화
      const updatedStatuses = objectStatuses.map((_, i) => i === index);
      setObjectStatuses(updatedStatuses);
      localStorage.setItem("objectStatuses", JSON.stringify(updatedStatuses));
      setSelectedIndex(index); // 선택된 인덱스를 설정
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
          <FloorInterior>
            {/* 선택된 인덱스에 따라 오브제 아이콘 변경 */}
            {selectedIndex !== null && (
              <RightFloorObj
                src={
                  selectedIndex === 0
                    ? BlackHeartObjIcon
                    : selectedIndex === 1
                      ? HeartObjIcon
                      : PinkHeartObjIcon
                }
                alt="Selected Obj Icon"
              />
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
          <ObjCheckText2>구매하기</ObjCheckText2>
          <ObjCheck onClick={handleObjCheckClick}>
            <ObjCheckImage src={ObjCheckIcon} alt="ObjCheck Icon" />
          </ObjCheck>
        </TopRow>
        <ObjItems>
          {objectNames.length > 0 ? (
            objectNames.map((name, index) => (
              <ObjItem
                key={index}
                onClick={() => handleObjItemClick(index)}
                style={{ opacity: objectStatuses[index] ? 1 : 0.5 }}
              >
                <ObjItemCheckImage
                  src={
                    index === 0
                      ? BlackHeartObjIcon
                      : index === 1
                        ? HeartObjIcon
                        : PinkHeartObjIcon
                  } // 인덱스에 따른 아이콘 변경
                  alt={
                    index === 0
                      ? "BlackHeartObjIcon"
                      : index === 1
                        ? "Heart Obj Icon"
                        : "PinkHeart Obj Icon"
                  }
                />
                <Text>{name}</Text>
              </ObjItem>
            ))
          ) : (
            <Text>정보 없음</Text>
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

export default Gift;

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
  z-index: 1;
`;

const Circular = styled.img`
  width: 120px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.greenColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 75px;
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
  width: 70px;
  height: 80px;
  position: absolute;
  bottom: 115px;
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
  margin-bottom: 10px;
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
  margin-top: 110px;
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
