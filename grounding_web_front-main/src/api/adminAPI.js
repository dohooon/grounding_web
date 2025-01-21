import axios from './axios';

// 관리자 로그인
export const adminLogin = async (userId, password) => {
  try {
    const response = await axios.post('/admin/login', { user_id: userId, pw: password });
    console.log('Admin login response:', response);
    return response;
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error;
  }
};

// 모든 자산 가져오기
export const getAssets = async () => {
  try {
    const response = await axios.get('/admin/assets');
    console.log('Get assets response:', response);
    return response.data;
  } catch (error) {
    console.error('Error getting assets:', error);
    throw error;
  }
};

// 자산 승인 또는 거절
export const updateAssetStatus = async (assetFileId, adminYn) => {
  try {
    const response = await axios.post('/admin/assets', { asset_file_id: assetFileId, admin_yn: adminYn });
    console.log('Update asset status response:', response);
    return response.data;
  } catch (error) {
    console.error('Error updating asset status:', error);
    throw error;
  }
};
