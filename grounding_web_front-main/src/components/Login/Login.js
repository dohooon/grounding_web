import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userAPI"; // API 함수 임포트
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("user", JSON.stringify(response.payload));
      localStorage.setItem("token", response.payload.access_token);
      onLogin(email);
      navigate("/");
    } catch (error) {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요"
          />
        </div>
        <div className="input-container">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      <div className="login-links">
        <p onClick={() => navigate("/signup")}>
          계정이 없으신가요?{" "}
          <span style={{ color: "var(--main)" }}>회원가입</span>하기
        </p>

        <span className="divider"></span>
      </div>
    </div>
  );
}

export default Login;
