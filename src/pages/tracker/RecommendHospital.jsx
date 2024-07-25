import { useEffect, useState } from "react";
import { fetchHospitals } from "../../api/diaryApi";

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
      <h1>의료기관</h1>
      {institutions.length > 0 ? (
        <ul>
          {institutions.map((institution, index) => (
            <li key={index}>
              <h2>
                <a href={institution.placeUrl}>{institution.categoryName}</a>
              </h2>
              <p>{institution.distance}</p>
              <p>{institution.placeName}</p>
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
