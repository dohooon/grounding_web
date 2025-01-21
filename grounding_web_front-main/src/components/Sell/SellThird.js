import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./SellThird.css";

function SellThird({ username }) {
  const navigate = useNavigate();
  const [agreeNotifications, setAgreeNotifications] = useState(null);

  const handleComplete = () => {
    navigate("/main");
  };

  return (
    <div className="sell-container">
      <h2>{username} 회원님, 자산등록이 완료되었습니다</h2>
      <div className="progress-container">
        <div className="step">
          <div className="circle filled"></div>
        </div>
        <div className="line filled"></div>
        <div className="step">
          <div className="circle filled"></div>
        </div>
        <div className="line filled"></div>
        <div className="step">
          <div className="circle filled"></div>
        </div>
      </div>
      <div className="notification-container">
        <p>사용자가 조각 구매시 알림받기</p>
        <div className="notification-options">
          <label>
            <input
              type="radio"
              name="notifications"
              value="agree"
              checked={agreeNotifications === "agree"}
              onChange={() => setAgreeNotifications("agree")}
            />
            동의함
          </label>
          <label>
            <input
              type="radio"
              name="notifications"
              value="disagree"
              checked={agreeNotifications === "disagree"}
              onChange={() => setAgreeNotifications("disagree")}
            />
            동의하지 않음
          </label>
        </div>
      </div>
      <p className="complete-p" onClick={handleComplete}>
        메인 페이지로 이동하기
      </p>
    </div>
  );
}

SellThird.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SellThird;
