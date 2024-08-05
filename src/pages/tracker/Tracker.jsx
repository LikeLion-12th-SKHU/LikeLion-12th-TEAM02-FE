// Tracker.jsx
import { useQuery } from "@tanstack/react-query";
import Menubar from "../../components/common/Menubar";
import { fetchDiaries } from "../../api/diaryApi";
import Header from "../../components/common/Header";
import DiaryCalendar from "../../components/tracker/DiaryCalendar";
import * as T from "../../styles/tracker";

export default function Tracker() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["diaries"],
    queryFn: fetchDiaries
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <T.DiaryErrorMessage>Error: {error.message}</T.DiaryErrorMessage>;

  return (
    <div>
      <Header title="감정 통계" />
      <DiaryCalendar diaries={data} />
      <Menubar />
    </div>
  );
}
