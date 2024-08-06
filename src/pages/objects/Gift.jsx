import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Menubar from "../../components/common/Menubar";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";
import AngryHoyaIcon from "../../assets/icons/AngryHoya.svg";
import ShopIcon from "../../assets/icons/Shop.svg";
import ObjCheckIcon from "../../assets/icons/ObjCheck.svg";
import HeartObjIcon from "../../assets/icons/HeartObj.svg";
import PinkHeartObjIcon from "../../assets/icons/PinkHeartObj.svg";
import BlackHeartObjIcon from "../../assets/icons/BlackHeartObj.svg";

const Gift = () => {
  const [objectNames, setObjectNames] = useState([]);
  const [objectStatuses, setObjectStatuses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState("owned"); // "owned" or "available"
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const fetchObjectData = async (url) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        console.log("API 응답 데이터:", response.data);

        const objectData = response.data.data;
        if (objectData && objectData.length > 0) {
          const names = objectData.map((obj) => obj.objectName || obj);
          const statuses = objectData.map((obj) => obj.status || false);
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

  useEffect(() => {
    if (viewMode === "owned") {
      fetchObjectData("https://moodfriend.site/api/v1/object/owned/display");
    } else if (viewMode === "available") {
      fetchObjectData(
        "https://moodfriend.site/api/v1/object/available/display"
      );
    }
  }, [viewMode]);

  const handleShopClick = () => {
    navigate("/shop");
  };

  const handleObjCheckClick = () => {
    if (viewMode === "available") {
      alert("상점에서 구매해주세요!");
    } else {
      navigate("/object");
    }
  };

  const handleObjItemClick = (index) => {
    const updatedStatuses = objectStatuses.map((_, i) => i === index);
    setObjectStatuses(updatedStatuses);
    localStorage.setItem("objectStatuses", JSON.stringify(updatedStatuses));
    setSelectedIndex(index);
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
          <ObjCheckText onClick={() => setViewMode("owned")}>
            보유중
          </ObjCheckText>
          <ObjCheckText2 onClick={() => setViewMode("available")}>
            구매하기
          </ObjCheckText2>
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
                style={{
                  opacity:
                    (viewMode === "owned" && objectStatuses[index]) ||
                    (viewMode === "available" && selectedIndex === index)
                      ? 1
                      : 0.7
                }}
              >
                <ObjItemCheckImage
                  src={
                    index === 0
                      ? BlackHeartObjIcon
                      : index === 1
                        ? HeartObjIcon
                        : PinkHeartObjIcon
                  }
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
  cursor: pointer;
`;

const ObjCheckText2 = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-right: 65px;
  cursor: pointer;
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
