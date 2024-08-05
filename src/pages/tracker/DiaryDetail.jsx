// src/pages/DiaryDetail.jsx

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDiary, fetchDiary, generateAiDiary } from "../../api/diaryApi";
import * as T from "../../styles/tracker";
import Header from "../../components/common/Header";
import DiaryDetailForm from "../../components/tracker/DiaryDetailForm";
import { useEffect, useState } from "react";

const DiaryDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["diary", id],
    queryFn: () => fetchDiary(id)
  });

  const [summary, setSummary] = useState(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    }
  });

  useEffect(() => {
    const fetchSummary = async () => {
      setIsSummaryLoading(true);
      try {
        const summaryData = await generateAiDiary(data.createdAt);
        setSummary(summaryData.data.summary);
      } catch (error) {
        console.error("Failed to generate summary:", error);
      } finally {
        setIsSummaryLoading(false);
      }
    };

    if (data) {
      fetchSummary();
    }
  }, [id, data]);

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
      <DiaryDetailForm
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        summaryData={summary}
      />
    </T.DiaryLayout>
  );
};

export default DiaryDetail;
