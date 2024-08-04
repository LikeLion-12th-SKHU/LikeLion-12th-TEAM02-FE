import { Link } from "react-router-dom";
import styled from "styled-components";

export const CommonLayout = styled.div`
  max-width: 430px;
  min-width: 360px;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const FriendSection = styled.section`
  margin: 20px;
`;

export const FriendHeadline1 = styled.h1`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;

export const SearchWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 320px;
  height: 50px;
  margin: 10px auto;
  background: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const SearchInput = styled.input`
  border: none;
  width: 100%;
`;

export const FriendCardLayout = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 50px;
  align-items: center;
  border-bottom: 0.5px solid #f1f3f5;
  margin-bottom: 20px;
`;

export const CommonFlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FriendHeadline3 = styled.h3`
  font-family: Pretendard;
  font-weight: 600;
`;

export const FriendParagraph = styled.p`
  font-family: Pretendard;
  font-weight: 400
  color: #999;
  
`;

export const FriendAnchor = styled(Link)`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  margin-left: auto;
  width: 100px;
  display: block;
`;

export const AcceptBtn = styled.button`
  width: 60px;
  height: 30px;
  background: ${(props) => props.backColor || "#fff"};
  border-radius: 5px;
  color: #fff;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 14px;
  margin-left: auto;
`;
