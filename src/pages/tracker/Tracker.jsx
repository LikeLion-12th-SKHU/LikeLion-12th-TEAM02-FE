// Tracker.jsx
import { useQuery } from "@tanstack/react-query";
import Menubar from "../../components/common/Menubar";
import { fetchDiaries } from "../../api/diaryApi";
import Header from "../../components/common/Header";
import DiaryCalendar from "../../components/tracker/DiaryCalendar";

export default function Tracker() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["diaries"],
    queryFn: fetchDiaries
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header title="감정 통계" />
      <DiaryCalendar diaries={data} />
      <Menubar />
    </div>
  );
}
