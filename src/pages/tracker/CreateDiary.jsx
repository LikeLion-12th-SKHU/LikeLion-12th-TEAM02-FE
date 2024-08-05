// CreateDiary.jsx
import React, { useState } from "react";
import { createDiary } from "../../api/diaryApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";
import DiaryForm from "../../components/tracker/DiaryForm";
import * as T from "../../styles/tracker";
import Header from "../../components/common/Header";

const CreateDiary = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    emotionType: EmotionTypes.JOY,
    weatherType: WeatherTypes.SUNNY,
    createdAt: new Date().toISOString().substring(0, 10)
  });

  const navigate = useNavigate();
  const diaryMutation = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      navigate("/tracker");
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        alert("해당 날짜에는 일기가 이미 존재합니다.");
      } else {
        alert("일기 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    diaryMutation.mutate(formData);
  };

  return (
    <T.DiaryLayout>
      <Header backLink="/tracker" title="새 일기 작성" />
      <DiaryForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={diaryMutation.isLoading}
        isError={diaryMutation.isError}
      />
    </T.DiaryLayout>
  );
};

export default CreateDiary;
