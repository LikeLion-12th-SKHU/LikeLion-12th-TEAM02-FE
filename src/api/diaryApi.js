// src/api/diaryApi.js

import instance from "./instance";
const memberId = 3;

// 일기 생성
export const createDiary = async (diary) => {
  const res = await instance.post(
    `/api/v1/diary/create?memberId=${memberId}`,
    diary
  );
  return res.data;
};

// 모든 일기 조회
export const fetchDiaries = async () => {
  const res = await instance.get(`/api/v1/diary/display?memberId=${memberId}`);
  return res.data.data;
};

// 특정 일기 조회
export const fetchDiary = async (diaryId) => {
  const res = await instance.get(
    `/api/v1/diary/display/${diaryId}?memberId=${memberId}`
  );
  return res.data.data;
};

export const updateDiary = async (diaryId, diary) => {
  try {
    const res = await instance.patch(
      `/api/v1/diary/update/${diaryId}?memberId=${memberId}`,
      diary
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDiary = async (diaryId) => {
  const res = await instance.delete(
    `/api/v1/diary/delete/${diaryId}?memberId=${memberId}`
  );
  return res.data;
};

// 사용자 위치 정보
export const fetchHospitals = async (longitude, latitude, radius = 10000) => {
  try {
    const res = await instance.get("/api/v1/member/hospital/display", {
      params: {
        x: longitude,
        y: latitude,
        radius
      }
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};
