import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import EndSignUp from "./components/SignUp/EndSignUp";
import Main from "./components/Main/Main";
import Banner from "./components/Banner/Banner";
import Notifications from "./components/Notification/Notifications";
import NotificationInfo from "./components/Notification/NotificationInfo";
import Sell from "./components/Sell/Sell";
import SellSecond from "./components/Sell/SellSecond";
import SellThird from "./components/Sell/SellThird";
import Assets from "./components/Asset/Assets";
import InfoChart from "./components/AssetInfo/InfoChart"; //자산 차트
import InfoDetail from "./components/AssetInfo/InfoDetail"; //자산 상세정보
import InfoDisclosure from "./components/AssetInfo/InfoDisclosure"; //공시 목록
import WriteDisclosure from "./components/AssetInfo/WriteDisclosure"; //공시작성

import SellInfo from "./components/BannerNotlogin/SellInfo"; //조각판매 알아보기
import Listings from "./components/BannerNotlogin/Listings"; //조각판매 구경하기
import QnA from "./components/BannerNotlogin/QnA"; //자주묻는질문
import AdminAssets from "./components/Admin/AdminAssets"; //관리자 자산관리
import AdminLogin from "./components/Admin/AdminLogin"; //관리자 로그인

function AppRouter({ isLoggedIn, username, onLogin, onLogout }) {
  return (
    <Router>
      <Banner isLoggedIn={isLoggedIn} username={username} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<SellInfo />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/end-signup" element={<EndSignUp onLogin={onLogin} />} />
        <Route path="/main" element={<Main />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notifications/:id" element={<NotificationInfo />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sellSecond" element={<SellSecond />} />
        <Route path="/sellThird" element={<SellThird username={username} />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/info-chart/:name" element={<InfoChart />} />
        <Route path="/info-detail/:name" element={<InfoDetail />} />
        <Route path="/info-disclosure/:name" element={<InfoDisclosure />} />
        <Route path="/sell-info" element={<SellInfo />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/adminassets" element={<AdminAssets />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/write-disclosure" element={<WriteDisclosure />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
