import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./style.css";
import * as T from "../../styles/tracker";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import SoSoIcon from "../../assets/icons/Hoya-SoSoIcon-Solid.svg";

const DiaryCalendar = ({ diaries }) => {
  const navigate = useNavigate();

  const onDateClick = (date) => {
    const clickedDate = new Date(date).toDateString();
    const diary = diaries.find(
      (diary) => new Date(diary.createdAt).toDateString() === clickedDate
    );

    if (diary) {
      navigate(`/diary/${diary.diaryId}`);
    }
  };

  const handleCreate = () => {
    navigate("/diary/new");
  };

  const handleHospital = () => {
    navigate("/hospital");
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      const diary = diaries.find(
        (diary) => new Date(diary.createdAt).toDateString() === dateString
      );

      if (diary) {
        return (
          <div style={{ position: "relative", height: "100%" }}>
            <T.RadioImg
              src={SoSoIcon}
              style={{ position: "absolute", top: "-25px", right: "0" }}
            />
          </div>
        );
      }
    }
  };

  return (
    <T.CalendarLayout>
      <T.SubmitBtn type="button" onClick={handleCreate} mg="0 20px 0 auto">
        <T.SubmitIcon icon={faPenToSquare} style={{ color: "#fff" }} />
      </T.SubmitBtn>
      <Calendar
        locale="en"
        onClickDay={onDateClick}
        next2Label={null}
        prev2Label={null}
        tileContent={tileContent}
      />
      <T.RecommendLayout>
        <T.HospitalCaption>전문가의 상담이 필요하신가요?</T.HospitalCaption>
        <T.RecommendBtn type="button" onClick={handleHospital}>
          주변 의료기관 추천받기
        </T.RecommendBtn>
      </T.RecommendLayout>
    </T.CalendarLayout>
  );
};

export default DiaryCalendar;
