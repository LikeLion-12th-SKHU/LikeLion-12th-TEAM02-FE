// src/components/tracker/DiaryForm.jsx
import React, { useState } from "react";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";
import * as T from "../../styles/tracker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import styled from "styled-components";
import "./style.css";
import JoyIcon from "../../assets/icons/Hoya-JoyIcon.svg";
import JoySolidIcon from "../../assets/icons/Hoya-JoyIcon-Solid.svg";
import SoSoIcon from "../../assets/icons/Hoya-SoSoIcon.svg";
import SoSoSolidIcon from "../../assets/icons/Hoya-SoSoIcon-Solid.svg";
import DispleasureIcon from "../../assets/icons/Hoya-DispleasureIcon.svg";
import DispleasureSolidIcon from "../../assets/icons/Hoya-DispleasureIcon-Solid.svg";
import SadnessIcon from "../../assets/icons/Hoya-SadnessIcon.svg";
import SadnessSolidIcon from "../../assets/icons/Hoya-SadnessIcon-Solid.svg";
import AngerIcon from "../../assets/icons/Hoya-AngerIcon.svg";
import AngerSolidIcon from "../../assets/icons/Hoya-AngerIcon-Solid.svg";

import {
  faSun,
  faSnowflake,
  faCloud,
  faCloudRain,
  faWind,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledDatePicker = styled(DatePicker)`
  border: none;
  background: none;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  text-align: center;
`;

const weatherIcons = {
  SUNNY: faSun,
  SNOW: faSnowflake,
  CLOUD: faCloud,
  RAIN: faCloudRain,
  WIND: faWind
};

const emotionIcons = {
  JOY: JoyIcon,
  SO_SO: SoSoIcon,
  SADNESS: SadnessIcon,
  DISPLEASURE: DispleasureIcon,
  ANGER: AngerIcon
};

// 감정 타입에 대한 선택된 아이콘 매핑
const emotionSolidIcons = {
  JOY: JoySolidIcon,
  SO_SO: SoSoSolidIcon,
  SADNESS: SadnessSolidIcon,
  DISPLEASURE: DispleasureSolidIcon,
  ANGER: AngerSolidIcon
};

const DiaryForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  isError
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleChange({
      target: {
        name: "createdAt",
        value: format(date, "yyyy-MM-dd")
      }
    });
  };

  return (
    <T.DiaryForm onSubmit={handleSubmit}>
      <T.DateLayout>
        <StyledDatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          required
        />
      </T.DateLayout>

      <T.DiaryFormLayout>
        <T.DiaryFormLabel>기분</T.DiaryFormLabel>
        <T.IconLayout>
          {Object.values(EmotionTypes).map((emotion) => (
            <label key={emotion}>
              <input
                type="radio"
                name="emotionType"
                value={emotion}
                checked={formData.emotionType === emotion}
                onChange={handleChange}
              />
              <T.RadioImg
                src={
                  formData.emotionType === emotion
                    ? emotionSolidIcons[emotion]
                    : emotionIcons[emotion]
                }
                alt={emotion}
              />
            </label>
          ))}
        </T.IconLayout>
      </T.DiaryFormLayout>

      <T.DiaryFormLayout>
        <T.DiaryFormLabel>날씨</T.DiaryFormLabel>
        <T.IconLayout>
          {Object.values(WeatherTypes).map((weather) => {
            const IconComponent = weatherIcons[weather];
            return (
              <label key={weather}>
                <input
                  type="radio"
                  name="weatherType"
                  value={weather}
                  checked={formData.weatherType === weather}
                  onChange={handleChange}
                />
                <T.RadioIcon
                  as={FontAwesomeIcon}
                  icon={IconComponent}
                  selected={formData.weatherType === weather}
                  alt={weather}
                />
              </label>
            );
          })}
        </T.IconLayout>
      </T.DiaryFormLayout>

      <T.DiaryFormLayout formHeight="240px">
        <T.DiaryFormLabel>일기</T.DiaryFormLabel>
        <T.TextInput
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={30}
          placeholder="제목"
          required
        />
        <T.TextArea
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={1024}
          placeholder="내용"
          required
        />
      </T.DiaryFormLayout>

      <T.SubmitBtn type="submit">
        <T.SubmitIcon icon={faCheck} style={{ color: "#fff" }} />
      </T.SubmitBtn>
      {isLoading && <p>일기 작성 중...</p>}
      {isError && <p>일기 작성 중 오류가 발생했습니다. 다시 시도해 주세요.</p>}
    </T.DiaryForm>
  );
};

export default DiaryForm;
