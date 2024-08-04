import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WhiteBackArrowIcon from "../../assets/icons/WhiteBackArrow.svg";

const Shop = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <BackButton src={WhiteBackArrowIcon} onClick={() => navigate(-1)} />
        <MyText>상점</MyText>
      </Box>
      <TopRow>
        <ObjCheckText>꾸미기</ObjCheckText>
        <ObjCheckText2>충전하기</ObjCheckText2>
      </TopRow>
      <Container></Container>
    </>
  );
};

export default Shop;

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

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${(props) => props.theme.color.primaryColor};
  position: relative;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px;
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
`;
