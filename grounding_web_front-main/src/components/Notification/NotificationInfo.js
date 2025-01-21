import React from 'react';
import { useParams } from 'react-router-dom';
//import './NotificationInfo.css';

function NotificationInfo() {
  const { id } = useParams();

  // 예시 알람 데이터
  const alarms = [
    { id: 1, title: '알람 1', description: '첫 번째 알람' },
    { id: 2, title: '알람 2', description: '두 번째 알람' },
    // 더 많은 알람 데이터
  ];

  const alarm = alarms.find((alarm) => alarm.id === parseInt(id));

  if (!alarm) {
    return <div>알람을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="notification-info">
      <h1>{alarm.title}</h1>
      <p>{alarm.description}</p>
    </div>
  );
}

export default NotificationInfo;
