// src/components/tracker/DiaryDetailForm.jsx
import React, { useState } from "react";
import * as T from "../../styles/tracker";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JoySolidIcon from "../../assets/icons/Hoya-JoyIcon-Solid.svg";
import SoSoSolidIcon from "../../assets/icons/Hoya-SoSoIcon-Solid.svg";
import DispleasureSolidIcon from "../../assets/icons/Hoya-DispleasureIcon-Solid.svg";
import SadnessSolidIcon from "../../assets/icons/Hoya-SadnessIcon-Solid.svg";
import AngerSolidIcon from "../../assets/icons/Hoya-AngerIcon-Solid.svg";
import {
  faSun,
  faSnowflake,
  faCloud,
  faCloudRain,
  faWind,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
const StyledDatePicker = styled(DatePicker)`
  border: none;
  background: none;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  text-align: center;
`;

const DiaryDetailForm = ({ data, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const emotion = Object.values(EmotionTypes).find(
    (emotion) => emotion === data.emotionType
  );
  const weather = Object.values(WeatherTypes).find(
    (weather) => weather === data.weatherType
  );

  const weatherIcons = {
    SUNNY: faSun,
    SNOW: faSnowflake,
    CLOUD: faCloud,
    RAIN: faCloudRain,
    WIND: faWind
  };

  const emotionIcons = {
    JOY: JoySolidIcon,
    SO_SO: SoSoSolidIcon,
    SADNESS: SadnessSolidIcon,
    DISPLEASURE: DispleasureSolidIcon,
    ANGER: AngerSolidIcon
  };

  const emotionIcon = emotionIcons[data.emotionType];

  return (
    <T.DiaryDetailLayout>
      <T.IconLayout>
        {emotion && <T.RadioImg src={emotionIcon} alt={emotion} />}
      </T.IconLayout>
      <StyledDatePicker
        selected={data.createdAt}
        dateFormat="yyyy-MM-dd"
        readOnly
      />

      <T.DiaryFormLayout formHeight="400px">
        <T.DiaryOptionBtn onClick={toggleMenu}>
          <FontAwesomeIcon icon={faEllipsis} />
          {menuOpen && (
            <T.DiaryDetailMenu>
              <T.DiaryDetailMenuBtn onClick={onEdit}>수정</T.DiaryDetailMenuBtn>
              <T.DiaryDetailMenuBtn onClick={onDelete}>
                삭제
              </T.DiaryDetailMenuBtn>
            </T.DiaryDetailMenu>
          )}
        </T.DiaryOptionBtn>
        <T.DiaryDetailTitleLayout>
          {weather && (
            <T.IconLayout>
              <T.RadioIcon
                as={FontAwesomeIcon}
                icon={weatherIcons[weather]}
                selected={data.weatherType === weather}
                alt={weather}
              />
            </T.IconLayout>
          )}
          <T.DiaryDetailHeadline1>{data.title}</T.DiaryDetailHeadline1>
        </T.DiaryDetailTitleLayout>
        <div>
          <T.TextArea
            name="content"
            value={data.content}
            maxLength={1024}
            readOnly
          />
        </div>
      </T.DiaryFormLayout>
    </T.DiaryDetailLayout>
  );
};

export default DiaryDetailForm;
