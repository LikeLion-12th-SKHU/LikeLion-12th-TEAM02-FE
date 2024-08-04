import { useEffect, useState } from "react";
import { fetchHospitals } from "../../api/diaryApi";
import Header from "../../components/common/Header";
import InstitutionCard from "../../components/tracker/InstitutionCard";
import * as T from "../../styles/tracker";

const RecommendHospital = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState(null);

  // Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      setError("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  // 서버에서 Fetch
  useEffect(() => {
    if (latitude && longitude) {
      const fetchData = async () => {
        try {
          const data = await fetchHospitals(longitude, latitude);
          setInstitutions(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [latitude, longitude]);

  if (error) {
    return <p>서버에서 에러가 발생했습니다.</p>;
  }

  if (!latitude || !longitude) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header title="병원 추천" backLink="/tracker" />
      <T.HospitalCaption style={{ margin: "20px 0 0 16px" }}>
        주변 반경 20km 내 의료기관입니다.
      </T.HospitalCaption>
      {institutions.length > 0 ? (
        <ul>
          {institutions.map((institution, index) => (
            <li key={index}>
              <InstitutionCard
                placeUrl={institution.placeUrl}
                categoryName={institution.categoryName}
                distance={institution.distance}
                placeName={institution.placeName}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>주변 의료기관 검색이 되지 않습니다.</p>
      )}
    </div>
  );
};

export default RecommendHospital;
