import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const DiaryLayout = styled.div`
  max-width: 430px;
  min-width: 360px;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const DiaryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateLayout = styled.div`
  margin: 24px auto;
`;

export const RadioImg = styled.img`
  width: 32px;
  height: 32px;
`;

export const RadioIcon = styled(FontAwesomeIcon)`
  font-size: 28px;
  color: ${(props) =>
    props.selected ? "#756AB6" : "gray"}; // 선택된 경우 색상 변경
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #756ab6;
  }
`;

export const DiaryFormLabel = styled.label`
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 400;
`;

export const DiaryFormLayout = styled.div`
  width: 300px;
  height: ${(props) => props.formHeight || "100px"};
  border-radius: 20px;
  background: #fff;
  padding: 20px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const IconLayout = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const TextInput = styled.input`
  border: none;
  font-family: "Pretendard";
`;

export const TextArea = styled.textarea`
  border: none;
  outline: none;
  font-family: "Pretendard";
  resize: none;
  width: 100%;
  height: 100%;
`;

export const SubmitBtn = styled.button`
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e0aed0;
`;

export const SubmitIcon = styled(FontAwesomeIcon)`
  font-size: 28px;
  display: block;
`;

export const DiaryDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
  align-items: center;
`;

export const DiaryOptionBtn = styled.button`
  width: 14px;
  height: 14px;
  float: right;
  margin-left: auto;
  position: relative;
`;

export const DiaryDetailHeadline1 = styled.h1`
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 400;
  margin-left: 85px;
`;

export const DiaryDetailTitleLayout = styled.div`
  display: flex;
  align-items: center;
`;

export const DiaryDetailMenu = styled.div`
  border-radius: 5px;
  background: #d4d4d4;
  position: absolute;
  width: 70px;
  top: 20px;
  right: 2px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
`;

export const DiaryDetailMenuBtn = styled.button`
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
  color: #fff;
`;
