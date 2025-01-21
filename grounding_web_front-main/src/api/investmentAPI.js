import axios from "./axios"; // 기존 axios 설정을 사용

// 자산 추가 API post investment-piece
export const addAsset = async (assetData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userId = 1;
    const response = await axios.post(
      `/investment-piece?userId=${userId}`,
      assetData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding asset:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 가져오기 API get investment-piece/list
export const getUserAssets = async () => {
  try {
    const response = await axios.get("/investment-piece/approved");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching assets:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 알림 get investment-piece/notification
export const getNotifications = async (pieceInvestmentId) => {
  try {
    const response = await axios.get(
      `/investment-piece/notification/${pieceInvestmentId}?page=0&size=10`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch notifications:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 알림 (특정 ID) get investment-piece/notification/{order-piece-id}
export const getNotificationById = async (orderPieceId) => {
  try {
    const response = await axios.get(
      `/investment-piece/notification/${orderPieceId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch notification by ID:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 공시 쪽 정보 가져오기 API get investment-piece/info/{piece_investment_id}
export const getAssetInfo = async (pieceInvestmentId) => {
  try {
    const response = await axios.get(
      `/investment-piece/info/${pieceInvestmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching asset info:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 공시 정보 가져오기 API get investment-piece/disclosure/{piece-investment-id}
export const getDisclosureInfo = async (pieceInvestmentId) => {
  try {
    const response = await axios.get(
      `/investment-piece/disclosure/${pieceInvestmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching disclosure info:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 승인된 목록 가져오기 API get investment-piece/approved
export const getApprovedAssets = async () => {
  try {
    const response = await axios.get("/investment-piece/approved");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching approved assets:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 공시 작성 API post investment-piece/disclosure
export const addDisclosure = async (disclosureData) => {
  try {
    const response = await axios.post(
      "/investment-piece/disclosure",
      disclosureData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding disclosure:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 공개 정보 수정 API put investment-piece/discl osure
export const updateDisclosure = async (disclosureData) => {
  try {
    const response = await axios.put(
      "/investment-piece/disclosure",
      disclosureData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating disclosure:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 자산 파일 추가 API post investment-piece/asset-file
export const addAssetFile = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const userId = 1;
    const response = await axios.post(
      `/investment-piece/asset-file?userId=${userId}`,
      formData,
      config
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding asset file:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 뉴스 추가 API post investment-piece/news
export const addNews = async (newsData) => {
  try {
    const response = await axios.post("/investment-piece/news", newsData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding news:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 특정 자산의 뉴스 가져오기 API get investment-piece/news/{piece-investment-id}
export const getNews = async (pieceInvestmentId) => {
  try {
    const response = await axios.get(
      `/investment-piece/news/${pieceInvestmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching news by piece investment ID:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
