import React from "react";
import { Container, Headline2, Paragraph1, Anchor } from "./style.jsx";
import AngryHoya from "../../assets/icons/AngryHoya.svg";

function NotFound() {
  return (
    <Container>
      <img src={AngryHoya} alt="호야 아이콘" />
      <Headline2>이런! 페이지를 찾을 수 없어요.</Headline2>
      <Paragraph1>
        페이지의 주소가 잘못되었거나 변경되어 <br />
        요청한 페이지를 찾을 수 없습니다.
      </Paragraph1>
      <Anchor to="/">홈으로 이동하기</Anchor>
    </Container>
  );
}

export default NotFound;
