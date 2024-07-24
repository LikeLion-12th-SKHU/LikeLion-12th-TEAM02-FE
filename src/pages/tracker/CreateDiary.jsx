// CreateDiary.jsx
import React, { useState } from "react";
import { createDiary } from "../../api/diaryApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EmotionTypes, WeatherTypes } from "../../constants/diaryEnums";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotionType, setEmotionType] = useState(EmotionTypes.JOY);
  const [weatherType, setWeatherType] = useState(WeatherTypes.SUNNY);

  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10); // "YYYY-MM-DD" 형식으로 자르기
  const [createdAt, setCreatedAt] = useState(formattedDate);

  const navigate = useNavigate();
  const diaryMutation = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      navigate("/tracker");
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

  return (
    <div>
      <h1>새 일기 작성</h1>
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
        <button type="submit">작성</button>
      </form>
      {diaryMutation.isLoading && <p>일기 작성 중...</p>}
      {diaryMutation.isError && (
        <p>일기 작성 중 오류가 발생했습니다. 다시 시도해 주세요.</p>
      )}
    </div>
  );
};

export default CreateDiary;
