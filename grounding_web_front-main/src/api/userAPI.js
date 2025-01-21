import axios from "./axios";

// 이메일 중복 확인 요청 API
export const checkEmailDuplication = async (email) => {
  try {
    const response = await axios.post("/users/sign-up/email/validation", {
      email,
    });
    console.log("Email duplication check response:", response);
    return response.data;
  } catch (error) {
    console.error("Error checking email duplication:", error);
    throw error;
  }
};

// 이메일 인증 코드 요청 API
export const requestEmailVerification = async (email) => {
  try {
    const response = await axios.post("/users/email/validation", { email });
    console.log("Email verification response:", response);
    return response.data;
  } catch (error) {
    console.error("Error requesting email verification:", error);
    throw error;
  }
};

// 이메일 인증 코드 확인 API
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await axios.post("/users/email/verification", {
      email,
      verification_code: code,
    });
    console.log("Email verification code check response:", response);
    return response.data;
  } catch (error) {
    console.error("Error verifying email code:", error);
    throw error;
  }
};

// 회원가입 API
export const signupUser = async (userData) => {
  try {
    const response = await axios.post("/users", userData);
    console.log("Signup response:", response);
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

// 로그인 API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/users/login", { email, password });
    console.log("Login response:", response);

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// 사용자 전화번호 API
export const getUserPhoneNumber = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/phone-number`);
    console.log("User phone number response:", response);
    return response.data;
  } catch (error) {
    console.error("Error getting user phone number:", error);
    throw error;
  }
};

// 사용자 이메일 API
export const getUserEmail = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/email`);
    console.log("User email response:", response);
    return response.data;
  } catch (error) {
    console.error("Error getting user email:", error);
    throw error;
  }
};