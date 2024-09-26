// Friends.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Menubar from "../../components/common/Menubar";
import * as F from "../../styles/friends";
import * as T from "../../styles/tracker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { deleteFriend, requestFriend } from "../../api/friendApi";
import { fetchFriends } from "../../api/friendApi";
import FriendCard from "../../components/friends/FriendCard";
import RequestMessage from "../../components/friends/RequestMessage";

function Friends() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState(null);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      try {
        const response = await requestFriend(email);
        setMessage("친구 요청을 보냈습니다.");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("친구 정보를 찾을 수 없습니다.");
          } else if (error.response.status === 409) {
            setMessage("이미 친구 요청을 보냈습니다");
          } else {
            setMessage("알 수 없는 오류가 발생했습니다.");
          }
        } else {
          setMessage("네트워크 오류가 발생했습니다.");
        }
      }
    }
  };

  // 3초 후 메시지 리셋
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const getFriends = async () => {
      const friendList = await fetchFriends();
      if (friendList) {
        setFriends(friendList);
      }
    };

    getFriends();
  }, []);

  const handleDelete = async (friendEmail) => {
    try {
      if (window.confirm("해당 친구를 정말 삭제하시겠습니까?")) {
        const res = await deleteFriend(friendEmail);
        alert("삭제가 완료되었습니다.");
        // 상태 관리를 위함.
        setFriends(friends.filter((friend) => friend.email !== friendEmail));
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                onDelete={() => handleDelete(friend.email)}
              />
            ))}
          </ul>
        ) : (
          <T.DiaryErrorMessage>친구 목록이 없습니다.</T.DiaryErrorMessage>
        )}
      </F.FriendSection>
      {message && <RequestMessage message={message} />}
      <Menubar />
    </div>
  );
}

export default Friends;
