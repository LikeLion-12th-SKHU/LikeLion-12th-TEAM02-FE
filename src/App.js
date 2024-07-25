// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { Main } from "./pages/Main";
import Chat from "./pages/chat/Chat";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import Tracker from "./pages/tracker/Tracker";
import CreateDiary from "./pages/tracker/CreateDiary";
import DiaryDetail from "./pages/tracker/DiaryDetail";
import EditDiary from "./pages/tracker/EditDiary";
import RecommendHospital from "./pages/tracker/RecommendHospital";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/diary/new" element={<CreateDiary />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />
        <Route path="/diary/edit/:id" element={<EditDiary />} />
        <Route path="/hospital" element={<RecommendHospital />} />
      </Routes>
    </Router>
  );
}

export default App;
