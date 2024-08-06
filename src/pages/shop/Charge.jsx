import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";

const Charge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName } = location.state || {}; // 구매한 오브제 정보 받기

  const handlePayment = (price) => {
    navigate("/payment", {
      state: {
        productName: productName,
        price: price
      }
    });
  };

  return (
    <>
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>충전소</MyText>
      </Box>
      <Content>
        <TopRow>
          <ObjCheckText>발바닥</ObjCheckText>
        </TopRow>
        <ObjCheckText2>단기</ObjCheckText2>
        <PaymentContainer onClick={() => handlePayment(2500)}>
          <ItemText>30</ItemText>
          <ItemText>2,500원</ItemText>
        </PaymentContainer>
        <PaymentContainer onClick={() => handlePayment(5500)}>
          <ItemText>70</ItemText>
          <ItemText>5,500원</ItemText>
        </PaymentContainer>
        <PaymentContainer onClick={() => handlePayment(9900)}>
          <ItemText>130</ItemText>
          <ItemText>9,900원</ItemText>
        </PaymentContainer>
      </Content>
    </>
  );
};

export default Charge;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
  font-weight: bold;
`;

const Content = styled.div`
  padding: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ObjCheckText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-left: 40px;
`;

const ObjCheckText2 = styled.span`
  color: #4343437c;
  font-size: 12px;
  font-weight: bold;
  margin-left: 40px;
`;

const PaymentContainer = styled.div`
  margin: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ItemText = styled.h3`
  margin: 0;
  flex: 1;
  text-align: center;
`;

const PaymentButton = styled.button`
  background-color: ${(props) => props.theme.color.primaryColor};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
