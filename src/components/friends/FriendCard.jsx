import React from "react";
import * as F from "../../styles/friends";
import JoyIcon from "../../assets/icons/Hoya-JoyIcon-Solid.svg";
import SoSoIcon from "../../assets/icons/Hoya-SoSoIcon-Solid.svg";
import SadnessIcon from "../../assets/icons/Hoya-SadnessIcon-Solid.svg";
import DispleasureIcon from "../../assets/icons/Hoya-DispleasureIcon-Solid.svg";
import AngerIcon from "../../assets/icons/Hoya-AngerIcon-Solid.svg";

const FriendCard = ({ friend, isRequest, onAccept, onDelete }) => {
  const emotionImageMap = {
    JOY: JoyIcon,
    SO_SO: SoSoIcon,
    SADNESS: SadnessIcon,
    DISPLEASURE: DispleasureIcon,
    ANGER: AngerIcon
  };

  const emotionImage = emotionImageMap[friend.emotionType] || null;

  return (
    <F.FriendCardLayout>
      {!isRequest && emotionImage && (
        <div style={{ width: "40px", height: "40px" }}>
          <img
            src={emotionImage}
            alt={friend.emotionType}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      <F.CommonFlexLayout>
        <F.FriendHeadline3>{friend.name}</F.FriendHeadline3>
        <F.FriendParagraph>{friend.email}</F.FriendParagraph>
      </F.CommonFlexLayout>

      {isRequest && (
        <F.AcceptBtn onClick={onAccept} backColor="#1CC260">
          수락
        </F.AcceptBtn>
      )}
      {!isRequest && (
        <F.AcceptBtn onClick={onDelete} backColor="#F3314C">
          삭제
        </F.AcceptBtn>
      )}
    </F.FriendCardLayout>
  );
};

export default FriendCard;
