// src/pages/friends/RequestList.jsx

import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import * as F from "../../styles/friends";
import { acceptFriendRequest, fetchRequestFriends } from "../../api/friendApi";
import FriendCard from "../../components/friends/FriendCard";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequestFriends = async () => {
      const requestLists = await fetchRequestFriends();
      if (requestLists) {
        setRequests(requestLists);
      }
    };

    getRequestFriends();
  }, []);

  const handleAccept = async (friendEmail) => {
    try {
      const response = await acceptFriendRequest(friendEmail);
      alert("수락 완료");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header title="친구 요청 내역" backLink="/friends" />
      <F.FriendSection>
        <F.FriendHeadline1>
          다음 사용자가 친구가 되고 싶어합니다.
        </F.FriendHeadline1>
        {requests.length > 0 ? (
          <ul style={{ margin: "20px 0" }}>
            {requests.map((friend) => (
              <FriendCard
                key={friend.memberId}
                friend={friend}
                isRequest={true}
                onAccept={() => handleAccept(friend.email)}
              />
            ))}
          </ul>
        ) : (
          <p>친구 요청이 없습니다.</p>
        )}
      </F.FriendSection>
    </div>
  );
};

export default RequestList;
