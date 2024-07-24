// src/pages/tracker/EditDiary.jsx

import React, { useState, useEffect } from "react";
import { updateDiary, fetchDiary } from "../../api/diaryApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";

const EditDiary = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotionType, setEmotionType] = useState(EmotionTypes.JOY);
  const [weatherType, setWeatherType] = useState(WeatherTypes.SUNNY);
  const [createdAt, setCreatedAt] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary", id],
    queryFn: () => fetchDiary(id)
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setEmotionType(data.emotionType);
      setWeatherType(data.weatherType);
      setCreatedAt(data.createdAt);
    }
  }, [data]);

  const diaryMutation = useMutation({
    mutationFn: (updatedDiary) => updateDiary(id, updatedDiary),
    onSuccess: () => {
      navigate(`/diary/${id}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    diaryMutation.mutate({
      emotionType,
      weatherType,
      title,
      content,
      createdAt
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <h1>일기 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1024}
            required
          />
        </div>
        <div>
          <label>감정:</label>
          <select
            value={emotionType}
            onChange={(e) => setEmotionType(e.target.value)}
            required
          >
            {Object.values(EmotionTypes).map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>날씨:</label>
          <select
            value={weatherType}
            onChange={(e) => setWeatherType(e.target.value)}
            required
          >
            {Object.values(WeatherTypes).map((weather) => (
              <option key={weather} value={weather}>
                {weather}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>작성일자:</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정</button>
      </form>
      {diaryMutation.isLoading && <p>일기 수정 중...</p>}
      {diaryMutation.isError && (
        <p>일기 수정 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
      )}
    </div>
  );
};

export default EditDiary;
