import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EndSignUp.css';

function EndSignUp({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};

  React.useEffect(() => {
    if (!username) {
      console.warn('Username is not provided');
    } else {
      console.log(`Welcome message for ${username}`);
      onLogin(username); // 로그인 처리
    }
  }, [username, onLogin]);

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <div className="end-signup-container">
      {username ? (
        <>
          <h1 className="end-signup-title">{username} 님, 회원가입을 축하합니다!</h1>
          <p className="end-signup-message">홈페이지로 이동하여 사이트를 둘러보세요.</p>
          <button className="end-signup-button" onClick={handleGoHome}>홈페이지로 이동</button>
        </>
      ) : (
        <p className="end-signup-error">회원가입 정보가 없습니다. 다시 시도해주세요.</p>
      )}
    </div>
  );
}

export default EndSignUp;
