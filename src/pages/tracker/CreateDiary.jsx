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
