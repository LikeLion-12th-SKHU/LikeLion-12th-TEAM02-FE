// src/components/friends/RequestMessage.jsx
import React, { useEffect, useState } from "react";
import shop from "../../assets/icons/Shop.svg";
import styled from "styled-components";

const ToastWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-width: 250px;
  padding: 10px;
  height: 30px;
  border-radius: 15px;
  background: #888;
  color: #fff;
  z-index: 99;
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 20%);
`;

const ToastImage = styled.img`
  width: 24px;
  height: 24px;
`;

const ToastMessage = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const RequestMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <ToastWrap>
      <ToastImage src={shop} alt="아이콘" />
      <ToastMessage>{message}</ToastMessage>
    </ToastWrap>
  );
};

export default RequestMessage;
