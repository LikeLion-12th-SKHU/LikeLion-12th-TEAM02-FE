import React from "react";
import * as T from "../../styles/tracker";
import kakaoMap from "../../assets/icons/kakaomap_basic.png";

const InstitutionCard = ({ placeUrl, categoryName, distance, placeName }) => {
  const distanceInKm = (distance / 1000).toFixed(1);
  return (
    <T.InstitutionCardBox>
      <T.FlexColumnLayout>
        <T.CardHeadline1>{placeName}</T.CardHeadline1>
        <T.CardLabel>{categoryName}</T.CardLabel>
        <T.CardSpan>{distanceInKm} km </T.CardSpan>
      </T.FlexColumnLayout>
      <div>
        <a href={placeUrl}>
          <T.CardImg src={kakaoMap} alt="카카오맵" />
        </a>
      </div>
    </T.InstitutionCardBox>
  );
};
export default InstitutionCard;
