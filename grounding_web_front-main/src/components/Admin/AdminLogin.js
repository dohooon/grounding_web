import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/adminAPI"; // Admin API 설정 파일 임포트
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminLogin(username, password);

      if (response && response.status === 200) {
        // 로그인 성공 시
        navigate("/adminassets");
        console.log("Admin login success:", response);
      } else {
        // 로그인 실패 시
        setError("ID 또는 비밀번호가 유효하지 않습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("Login error:", error);
      setError("ID 또는 비밀번호가 유효하지 않습니다.");
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <p>관리자 로그인 페이지입니다.</p>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin;
