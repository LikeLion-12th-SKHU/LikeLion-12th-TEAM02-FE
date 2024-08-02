import React from "react";
import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스피너 컨테이너 스타일링
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체를 차지하도록 */
`;

// 스피너 스타일링
const StyledSpinner = styled.div`
  border: 8px solid #f3f3f3; /* 밝은 회색 배경 */
  border-top: 8px solid #3498db; /* 스피너의 색상 */
  border-radius: 50%;
  width: 50px; /* 스피너의 크기 */
  height: 50px; /* 스피너의 크기 */
  animation: ${spin} 1s linear infinite; /* 애니메이션 적용 */
`;

const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner />
  </SpinnerContainer>
);

export default Spinner;
