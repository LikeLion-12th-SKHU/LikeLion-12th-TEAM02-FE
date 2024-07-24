// Tracker.jsx
import { useQuery } from "@tanstack/react-query";
import Menubar from "../../components/common/Menubar";
import { fetchDiaries } from "../../api/diaryApi";
import { Link } from "react-router-dom";

export default function Tracker() {
  const {
    data = [],
    error,
    isLoading
  } = useQuery({
    queryKey: ["diaries"],
    queryFn: fetchDiaries
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Diary List</h1>
      <ul>
        {data.map((diary, index) => (
          <li key={index}>
            <h2>
              <Link to={`/diary/${index}`}>{diary.title}</Link>
            </h2>
            <p>{diary.content}</p>
            <p>{diary.createdAt}</p>
          </li>
        ))}
      </ul>
      <Menubar />
    </div>
  );
}
