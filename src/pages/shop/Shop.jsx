import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";

const Shop = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailableObjects = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("로그인이 필요합니다.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://moodfriend.site/api/v1/object/available/display",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const { success, data, message } = response.data;

        if (success) {
          setObjects(data); // data가 이미 배열 형태임
        } else {
          setError(message || "오브제 조회에 실패했습니다.");
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        setError("서버 요청 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableObjects();
  }, []);

  if (isLoading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    <>
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>상점</MyText>
      </Box>
      <TopRow>
        <ObjCheckText>꾸미기</ObjCheckText>
        <ObjCheckText2 onClick={() => navigate("/charge")}>
          충전하기
        </ObjCheckText2>
      </TopRow>
      <ObjectList>
        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : objects.length > 0 ? (
          objects.map((object, index) => (
            <ObjectItem key={index}>
              <ObjectBackground>
                <ObjectName>{object}</ObjectName> {/* object는 문자열 */}
                <BuyButton
                  onClick={() =>
                    navigate("/charge", {
                      state: { productName: object, price: 1000 } // 예시로 가격을 1000으로 설정
                    })
                  }
                >
                  구매하기
                </BuyButton>
              </ObjectBackground>
            </ObjectItem>
          ))
        ) : (
          <NoObjects>구매 가능한 오브제가 없습니다.</NoObjects>
        )}
      </ObjectList>
    </>
  );
};

export default Shop;

// 스타일 컴포넌트 정의
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

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

const ObjCheckText = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-left: 40px;
`;

const ObjCheckText2 = styled.span`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-right: 80px;
  cursor: pointer;
`;

const ObjectList = styled.div`
  margin: 20px;
`;

const ObjectItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ObjectBackground = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ObjectName = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
`;

const BuyButton = styled.button`
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const NoObjects = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
`;

const ErrorText = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
`;
