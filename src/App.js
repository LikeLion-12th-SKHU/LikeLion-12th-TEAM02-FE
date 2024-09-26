import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/auth/Login";
import KakaoLogin from "./pages/auth/KakaoLogin";
import GoogleLogin from "./pages/auth/GoogleLogin";
import Signup from "./pages/auth/Signup";
import { Main } from "./pages/Main";
import Flooring from "./pages/objects/Flooring";
import Furniture from "./pages/objects/Furniture";
import Gift from "./pages/objects/Gift";
import LeftAccessory from "./pages/objects/LeftAccessory";
import LeftWall from "./pages/objects/LeftWall";
import RightAccessory from "./pages/objects/RightAccessory";
import RightWall from "./pages/objects/RightWall";
import Rug from "./pages/objects/Rug";
import SideTable from "./pages/objects/SideTable";
import Sofa from "./pages/objects/Sofa";
import Toy from "./pages/objects/Toy";
import Wallpaper from "./pages/objects/Wallpaper";
import Object from "./pages/Object";
import Shop from "./pages/shop/Shop";
import Payment from "./pages/shop/Payment";
import Chat from "./pages/chat/Chat";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import EditSettings from "./pages/settings/EditSettings";
import InformationSettings from "./pages/settings/InformationSettings";
import WithdrawalSettings from "./pages/settings/WithdrawalSettings";
import Tracker from "./pages/tracker/Tracker";
import Charge from "./pages/shop/Charge";
import PaymentResult from "./pages/shop/PaymentResult";
import CreateDiary from "./pages/tracker/CreateDiary";
import DiaryDetail from "./pages/tracker/DiaryDetail";
import EditDiary from "./pages/tracker/EditDiary";
import RecommendHospital from "./pages/tracker/RecommendHospital";
import RequestList from "./pages/friends/RequestList";
import React, { useEffect, useState } from "react";
import MobileWarning from "./components/common/MobileWarning";
import NotFound from "./pages/Errors/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { configureAxios } from "./api/instance";
import { refreshAccessToken } from "./api/loginInstance";

function App() {
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate(); // useNavigate 호출

  // 모바일 기기 접속만 가능하도록 변경
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Axios 인터셉터 설정
  useEffect(() => {
    configureAxios(navigate);
  }, [navigate]);

  // 25분마다 accessToken을 갱신하는 타이머 설정
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 1000 * 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 모바일이 아닐 경우 경고 화면 표시
  if (!isMobile) {
    return <MobileWarning />;
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/callback/kakao" element={<KakaoLogin />} />
        <Route path="/auth/callback/google" element={<GoogleLogin />} />
        <Route path="/auth/signUp" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/leftWall" element={<LeftWall />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/sofa" element={<Sofa />} />
          <Route path="/rightWall" element={<RightWall />} />
          <Route path="/leftAccessory" element={<LeftAccessory />} />
          <Route path="/sideTable" element={<SideTable />} />
          <Route path="/toy" element={<Toy />} />
          <Route path="/rightAccessory" element={<RightAccessory />} />
          <Route path="/wallpaper" element={<Wallpaper />} />
          <Route path="/flooring" element={<Flooring />} />
          <Route path="/rug" element={<Rug />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/object" element={<Object />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/request" element={<RequestList />} />
          <Route path="/edit-setting" element={<EditSettings />} />
          <Route
            path="/information-setting"
            element={<InformationSettings />}
          />
          <Route path="/withdrawal-setting" element={<WithdrawalSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/diary/new" element={<CreateDiary />} />
          <Route path="/diary/:id" element={<DiaryDetail />} />
          <Route path="/diary/edit/:id" element={<EditDiary />} />
          <Route path="/hospital" element={<RecommendHospital />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

// Router로 감싸기
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
