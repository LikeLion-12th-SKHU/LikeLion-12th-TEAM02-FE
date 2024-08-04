// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/auth/Login";
import KakaoLogin from "./pages/auth/KakaoLogin";
import GoogleLogin from "./pages/auth/GoogleLogin";
import Signup from "./pages/auth/Signup";
import { Main } from "./pages/Main";
import Chat from "./pages/chat/Chat";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import EditSettings from "./pages/settings/EditSettings";
import InformationSettings from "./pages/settings/InformationSettings";
import WithdrawalSettings from "./pages/settings/WithdrawalSettings";
import Tracker from "./pages/tracker/Tracker";
import CreateDiary from "./pages/tracker/CreateDiary";
import DiaryDetail from "./pages/tracker/DiaryDetail";
import EditDiary from "./pages/tracker/EditDiary";
import RecommendHospital from "./pages/tracker/RecommendHospital";
import RequestList from "./pages/friends/RequestList";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/callback/kakao" element={<KakaoLogin />} />
        <Route path="/auth/callback/google" element={<GoogleLogin />} />
        <Route path="/auth/signUp" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/request" element={<RequestList />} />
        <Route path="/edit-setting" element={<EditSettings />} />
        <Route path="/information-setting" element={<InformationSettings />} />
        <Route path="/withdrawal-setting" element={<WithdrawalSettings />} />
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
