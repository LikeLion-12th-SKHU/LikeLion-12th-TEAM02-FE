// src/components/common/Header.jsx

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const HeaderLayout = styled.header`
  max-width: 430px;
  min-width: 360px;
  height: 10vw;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.color.primaryColor};
`;

const BackBtn = styled.button`
  margin-left: 10px;
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0 auto;
  padding-right: 20px;
  color: #fff;
  font-family: Pretendard;
  font-size: 1rem;
`;

const Header = ({ title, backLink }) => {
  const navigate = useNavigate();

  return (
    <HeaderLayout>
      <BackBtn onClick={() => navigate(backLink)}>
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#fff" }} />
      </BackBtn>
      <Title>{title}</Title>
    </HeaderLayout>
  );
};

export default Header;
