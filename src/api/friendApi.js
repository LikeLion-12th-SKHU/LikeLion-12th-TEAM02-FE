// src/api/friendApi.js

import instance from "./instance";

// 친구 요청
export const requestFriend = async (receiverEmail) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
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
  }
};

// 친구 목록 리스트 불러오기
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

// 친구 요청 받은 내역 불러오기
export const fetchRequestFriends = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await instance.get(`api/v1/friend/received/display`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 친구 요청 수락
export const acceptFriendRequest = async (friendEmail) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await instance.put(
      `api/v1/friend/accept?friendEmail=${friendEmail}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// 친구 요청 수락
export const rejectFriendRequest = async (friendEmail) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await instance.put(
      `api/v1/friend/reject?friendEmail=${friendEmail}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// 친구 삭제
export const deleteFriend = async (friendEmail) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await instance.delete(
      `api/v1/friend/delete?friendEmail=${friendEmail}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
