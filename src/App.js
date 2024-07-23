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
import Tracker from "./pages/tracker/Tracker";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/callback/kakao" element={<KakaoLogin />} />
        <Route path="/auth/callback/google" element={<GoogleLogin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
}

export default App;
