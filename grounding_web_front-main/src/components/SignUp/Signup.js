import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  requestEmailVerification,
  verifyEmailCode,
} from "../../api/userAPI";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [termsChecked, setTermsChecked] = useState({
    over18: false,
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });
  const [showTerms, setShowTerms] = useState({
    termsOfService: false,
    privacyPolicy: false,
  });
  const [emailVerificationCodeInput, setEmailVerificationCodeInput] =
    useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTermsChecked({ ...termsChecked, [name]: checked });
  };

  const handleEmailVerificationRequest = async () => {
    try {
      console.log("이메일 인증 요청 시작");
      await requestEmailVerification(formData.email);
      alert("이메일 인증 코드가 발송되었습니다.");
      setVerificationSent(true);
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      alert("이메일 인증 요청 실패");
    }
  };

  const handleEmailVerificationCodeCheck = async () => {
    try {
      await verifyEmailCode(formData.email, emailVerificationCodeInput);
      alert("이메일 인증이 완료되었습니다.");
      setIsEmailVerified(true);
    } catch (error) {
      console.error("이메일 인증 코드 검증 실패:", error);
      alert("이메일 인증 코드 검증 실패");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !termsChecked.over18 ||
      !termsChecked.termsOfService ||
      !termsChecked.privacyPolicy
    ) {
      alert("필수 약관에 동의해야 합니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      const response = await signupUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone_number: formData.phoneNumber,
      });
      console.log("회원가입 성공:", response);
      alert("회원가입 성공");
      navigate("/end-signup", { state: { username: formData.name } });
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const toggleTerms = (term) => {
    setShowTerms({ ...showTerms, [term]: !showTerms[term] });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-input-container">
          <label className="signup-input-label">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
          />{" "}
          <button
            type="button"
            onClick={handleEmailVerificationRequest}
            disabled={verificationSent}
            style={{
              width: "60px",
              padding: "5px 10px",
              fontSize: "14px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            인증
          </button>
        </div>

        {verificationSent && (
          <div className="signup-input-container verification-code">
            <label className="signup-input-label">인증 코드</label>
            <input
              type="text"
              name="emailVerificationCode"
              value={emailVerificationCodeInput}
              onChange={(e) => setEmailVerificationCodeInput(e.target.value)}
              className="signup-input"
            />
            <button type="button" onClick={handleEmailVerificationCodeCheck}>
              인증 코드 확인
            </button>
          </div>
        )}
        <div className="signup-input-container">
          <label className="signup-input-label">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-input-container">
          <label className="signup-input-label">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-input-container">
          <label className="signup-input-label">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-input-container">
          <label className="signup-input-label">전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="signup-input"
          />
        </div>

        <div className="terms-container">
          <label>
            <input
              type="checkbox"
              name="all"
              onChange={(e) => {
                const checked = e.target.checked;
                setTermsChecked({
                  over18: checked,
                  termsOfService: checked,
                  privacyPolicy: checked,
                  marketing: checked,
                });
              }}
              checked={
                termsChecked.over18 &&
                termsChecked.termsOfService &&
                termsChecked.privacyPolicy &&
                termsChecked.marketing
              }
            />
            약관 동의 (모두 동의)
          </label>

          <label>
            <input
              type="checkbox"
              name="over18"
              onChange={handleCheckboxChange}
              checked={termsChecked.over18}
            />
            (필수) 만 18세 이상입니다.
          </label>

          <label>
            <input
              type="checkbox"
              name="termsOfService"
              onChange={handleCheckboxChange}
              checked={termsChecked.termsOfService}
            />
            (필수) 서비스 이용약관 동의{" "}
            <button type="button" onClick={() => toggleTerms("termsOfService")}>
              [보기]
            </button>
          </label>
          {showTerms.termsOfService && (
            <div className="terms-content">서비스 이용약관 내용...</div>
          )}

          <label>
            <input
              type="checkbox"
              name="privacyPolicy"
              onChange={handleCheckboxChange}
              checked={termsChecked.privacyPolicy}
            />
            (필수) 개인정보 수집 및 이용 동의{" "}
            <button type="button" onClick={() => toggleTerms("privacyPolicy")}>
              [보기]
            </button>
          </label>
          {showTerms.privacyPolicy && (
            <div className="terms-content">개인정보 수집 및 이용 내용...</div>
          )}
        </div>

        <div className="signup-button-container">
          <button
            type="button"
            className="signup-button cancel"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            type="submit"
            className="signup-button submit"
            disabled={
              !(
                termsChecked.over18 &&
                termsChecked.termsOfService &&
                termsChecked.privacyPolicy
              )
            }
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
