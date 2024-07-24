// src/api/diaryApi.js

import instance from "./instance";

export const createDiary = async (diary) => {
  try {
    const res = await instance.post("/api/v1/diary/create", diary);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

// 모든 일기 조회
export const fetchDiaries = async () => {
  const res = await instance.get("/api/v1/diary/display");
  console.log(res.data);
  return res.data;
};

// 특정 일기 조회
export const fetchDiary = async (diaryId) => {
  const res = await instance.get(`/api/v1/diary/${diaryId}`);
  return res.data;
};
