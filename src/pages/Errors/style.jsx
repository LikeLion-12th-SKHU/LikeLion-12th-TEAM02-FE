import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  max-width: 430px;
  min-width: 360px;
  height: 100vh;
  background: #fff;
`;

export const Headline2 = styled.h2`
  color: #525463
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.25rem;
  letter-spacing: -0.01875rem;
`;

export const Paragraph1 = styled.p`
  color: #2b2d36;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: -0.00625rem;
`;

export const Anchor = styled(Link)`
  color: #756ab6;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: underline;
`;
