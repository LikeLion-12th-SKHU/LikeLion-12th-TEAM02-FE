// src/components/common/MobileWarning.jsx

import React from "react";
import styled from "styled-components";

const WarningOverlay = styled.div`
  font-family: Pretendard;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const WarningHeadline1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
`;

const MobileWarning = () => (
  <WarningOverlay>
    <div>
      <WarningHeadline1>모바일 기기로 접속해 주세요</WarningHeadline1>
      <p>
        Mood Friend는 모바일에 최적화된 서비스입니다! 모바일로 접속하시거나,
        모바일 사이즈로 줄여주세요!
      </p>
    </div>
  </WarningOverlay>
);

export default MobileWarning;
