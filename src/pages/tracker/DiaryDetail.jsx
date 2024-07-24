// src/pages/DiaryDetail.jsx

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDiary } from "../../api/diaryApi";

const DiaryDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["diary", id],
    queryFn: () => fetchDiary(id)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>{data.content}</p>
      <p>{data.weatherType}</p>
      <p>{data.createdAt}</p>
    </div>
  );
};

export default DiaryDetail;
