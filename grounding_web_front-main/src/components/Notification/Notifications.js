// src/components/Notification/Notifications.js
import React, { useEffect, useState } from "react";
import { getNotifications } from "../../api/investmentAPI";
import "./Notifications.css";

function Notifications() {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const pieceInvestmentId = localStorage.getItem("pieceInvestmentId");
        const data = await getNotifications(pieceInvestmentId);
        console.log("data", data);
        setAlarms(data.content);
      } catch (err) {
        setError("알림 데이터를 가져오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="alarm-list">
      <h1>알림 목록</h1>
      <table>
        <thead>
          <tr>
            <th>매물명</th>
            <th>구매자</th>
            <th>갯수</th>
            <th>진행률</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm) => (
            <tr key={alarm.order_piece_id}>
              <td>{alarm.order_piece_name}</td>
              <td>{alarm.user_name}</td>
              <td>{alarm.quantity}</td>
              <td>{alarm.progress_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notifications;
