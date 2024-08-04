// src/api/friendApi.js

import instance from "./instance";

// 친구 요청
export const requestFriend = async (receiverEmail) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const res = await instance.post(
        `api/v1/friend/request`,
        { receiverEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return res;
    } catch (err) {
      console.error(err);
    }
  }
};

export const fetchFriends = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await instance.get(`api/v1/friend/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};
