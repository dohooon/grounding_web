import axios from "./axios";
// /main/my 사용자 데이터
export const fetchMyData = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get("/main/my", config);
    return response.data;
  } catch (error) {
    throw new Error(`Fetching my data failed: ${error.message}`);
  }
};
