// Friends.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Menubar from "../../components/common/Menubar";
import * as F from "../../styles/friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { requestFriend } from "../../api/friendApi";
import { fetchFriends } from "../../api/friendApi";
import FriendCard from "../../components/friends/FriendCard";

function Friends() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const response = await requestFriend(email);
      console.log("Friend request sent:", response);
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      const friendList = await fetchFriends();
      if (friendList) {
        setFriends(friendList);
      }
    };

    getFriends();
  }, []);

  return (
    <div>
      <Header title="친구 추가" backLink="/" />
      <F.FriendSection>
        <F.FriendHeadline1>이메일로 친구 추가</F.FriendHeadline1>
        <F.SearchWrap>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ height: "20px" }}
          />
          <F.SearchInput
            type="email"
            placeholder="이메일로 검색"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </F.SearchWrap>
      </F.FriendSection>
      <F.FriendSection>
        <F.FriendHeadline1>친구 목록</F.FriendHeadline1>
        <F.FriendAnchor to="/friends/request">
          친구 요청 확인 <FontAwesomeIcon icon={faChevronRight} />
        </F.FriendAnchor>
        {friends.length > 0 ? (
          <ul style={{ margin: "20px 0" }}>
            {friends.map((friend) => (
              <FriendCard
                key={friend.memberId}
                friend={friend}
                isRequest={false}
              />
            ))}
          </ul>
        ) : (
          <p>친구 목록이 없습니다.</p>
        )}
      </F.FriendSection>
      <Menubar />
    </div>
  );
}

export default Friends;
