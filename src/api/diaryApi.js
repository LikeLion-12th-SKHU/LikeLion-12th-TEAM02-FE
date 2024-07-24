// src/api/diaryApi.js

import instance from "./instance";
const memberId = 1;
export const createDiary = async (diary) => {
  try {
    const res = await instance.post(
      `/api/v1/diary/create?memberId=${memberId}`,
      diary
    );
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

// export const updateDiary = async (id, diary) => {
//   const res = await instance.put(`/api/v1/diary/update?memberId=${memberId}`);
// };

export const deleteDiary = async (diaryId) => {
  const res = await instance.delete(
    `/api/v1/diary/delete/${diaryId}?memberId=${memberId}`
  );
  return res.data;
};
