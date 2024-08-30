// src/pages/DiaryDetail.jsx

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDiary, fetchDiary } from "../../api/diaryApi";
import * as T from "../../styles/tracker";
import Header from "../../components/common/Header";
import DiaryDetailForm from "../../components/tracker/DiaryDetailForm";

const DiaryDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["diary", id],
    queryFn: () => fetchDiary(id)
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    }
  });

  const onEdit = () => {
    navigate(`/diary/edit/${id}`);
  };

  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      navigate("/tracker");
      mutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <T.DiaryLayout>
      <Header backLink="/tracker" title="일기 조회" />
      <DiaryDetailForm data={data} onEdit={onEdit} onDelete={onDelete} />
      {/* <div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        <p>{data.weatherType}</p>
        <p>{data.createdAt}</p>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div> */}
    </T.DiaryLayout>
  );
};

export default DiaryDetail;
