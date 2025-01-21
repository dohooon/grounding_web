import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Banner.css";
import logo from "../../asset/icon/logo.png";

function Banner({ isLoggedIn, username, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout(); // 로그아웃 처리를 위해 부모 컴포넌트에서 전달된 콜백 함수 호출
    localStorage.removeItem("loggedInUser"); // 로그아웃 시 loggedInUser 항목 제거
    navigate("/"); // 로그아웃 후 '/' 경로로 이동
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div className="banner">
      <div className="banner-left">
        <Link to="/" className="logo">
          <img
            style={{
              width: "100px",
            }}
            src={logo}
            alt="logo"
          />
        </Link>
      </div>

      <div className="banner-center">
        {isLoggedIn ? (
          <>
            <Link to="/main" className={getLinkClass("/main")}>
              메인
            </Link>
            <Link
              to="/notifications"
              className={getLinkClass("/notifications")}
            >
              알림목록
            </Link>
            <Link to="/sell" className={getLinkClass("/sell")}>
              조각판매등록
            </Link>
            <Link to="/assets" className={getLinkClass("/assets")}>
              자산관리
            </Link>
          </>
        ) : (
          <>
            <Link to="/sell-info" className={getLinkClass("/sell-info")}>
              조각판매 알아보기
            </Link>
            <Link to="/listings" className={getLinkClass("/listings")}>
              모집 중인 매물 구경
            </Link>
            <Link to="/qna" className={getLinkClass("/qna")}>
              자주 묻는 질문
            </Link>
          </>
        )}
      </div>

      <div className="banner-right">
        {isLoggedIn ? (
          <>
            <span>{username}</span>
            <p onClick={handleLogout}>로그아웃</p>
          </>
        ) : (
          <Link to="/login">
            <div>로그인</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Banner;
