// src/pages/tracker/EditDiary.jsx

import React, { useState, useEffect } from "react";
import { updateDiary, fetchDiary } from "../../api/diaryApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";
import * as T from "../../styles/tracker";
import DiaryForm from "../../components/tracker/DiaryForm";
import Header from "../../components/common/Header";

const EditDiary = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    diaryId: id,
    title: "",
    content: "",
    emotionType: EmotionTypes.JOY,
    weatherType: WeatherTypes.SUNNY,
    createdAt: ""
  });

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary", id],
    queryFn: () => fetchDiary(id)
  });

  useEffect(() => {
    if (data) {
      setFormData({
        diaryId: data.diaryId,
        title: data.title,
        content: data.content,
        emotionType: data.emotionType,
        weatherType: data.weatherType,
        createdAt: data.createdAt
      });
    }
  }, [data]);

  const diaryMutation = useMutation({
    mutationFn: (updatedDiary) => updateDiary(updatedDiary),
    onSuccess: () => {
      navigate(`/diary/${id}`);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    diaryMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <T.DiaryErrorMessage>에러가 발생했습니다.</T.DiaryErrorMessage>;
  }

  return (
    <T.DiaryLayout>
      <Header backLink="/tracker" title="일기 수정" />
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

export default EditDiary;
