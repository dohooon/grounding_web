import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./SellInfo.css";
import main from "../../asset/images/main.png";

const SellInfo = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/admin-login"); // 경로를 소문자로 일치시킵니다.
  };

  return (
    <div className="sell-info-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: "40px",

            fontWeight: "bold",
          }}
        >
          그라운딩을 통해,
          <p
            style={{
              marginTop: "-5px",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            손쉽게 부동산에 투자해 보세요
          </p>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "var(--main)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://app.grounding.site/");
            }}
          >
            앱 다운로드
          </button>
        </div>
        <img
          style={{ width: "60%" }}
          src={main}
          alt="main"
          className="main-image"
        />
      </div>

      <div className="lock-icon-container" onClick={handleAdminLogin}>
        <FaLock className="lock-icon" />
      </div>
    </div>
  );
};

export default SellInfo;
