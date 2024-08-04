// src/api/diaryApi.js

import instance from "./instance";

// 일기 생성
export const createDiary = async (diary) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await instance.post(`/api/v1/diary/create`, diary, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

// 모든 일기 조회
export const fetchDiaries = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await instance.get(`/api/v1/diary/display`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data.data;
};

// 특정 일기 조회
export const fetchDiary = async (diaryId) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await instance.get(`/api/v1/diary/display/${diaryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data.data;
};

export const updateDiary = async (diary) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await instance.patch(`/api/v1/diary/update`, diary, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDiary = async (diaryId) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await instance.delete(`/api/v1/diary/delete/${diaryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

// 사용자 위치 정보
export const fetchHospitals = async (longitude, latitude, radius = 10000) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await instance.get(
      "/api/v1/member/hospital/display",
      {
        params: {
          x: longitude,
          y: latitude,
          radius
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};
