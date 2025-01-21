import React, { useState, useEffect } from "react";
import { getAssets, updateAssetStatus } from "../../api/adminAPI"; // API 함수 임포트
import "./AdminAssets.css"; // CSS 파일 임포트

const AdminAssets = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await getAssets();
        setAssets(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assets:", error);
        setError("자산을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchAssets();
  }, []);

  const handleApprove = async (assetFileId) => {
    try {
      await updateAssetStatus(assetFileId, "Y");
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.asset_file_id === assetFileId
            ? { ...asset, admin_yn: "Y" }
            : asset
        )
      );
    } catch (error) {
      console.error("Error approving asset:", error);
      setError("자산 승인 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async (assetFileId) => {
    try {
      await updateAssetStatus(assetFileId, "no");
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.asset_file_id === assetFileId
            ? { ...asset, admin_yn: "no" }
            : asset
        )
      );
    } catch (error) {
      console.error("Error rejecting asset:", error);
      setError("자산 거절 중 오류가 발생했습니다.");
    }
  };

  const handleDownload = (fileName) => {
    const url = `https://${fileName}`;
    const encodedUrl = encodeURI(url);

    const link = document.createElement("a");
    link.href = encodedUrl;
    link.setAttribute("download", fileName.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-assets-container">
      <h1>[관리자 페이지] 자산 관리</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="assets-table">
        <thead>
          <tr>
            <th>순서</th>
            <th>Investment ID</th>
            <th>문서 유형</th>
            <th>파일 이름</th>
            <th>승인 여부</th>
            <th>조치</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.asset_file_id}>
              <td>{asset.asset_file_id}</td>
              <td>{asset.user_id}</td>
              <td>{asset.document_type}</td>
              <td onClick={() => handleDownload(asset.file_name)}>
                {asset.file_name}
              </td>
              <td>{asset.admin_yn}</td>
              <td>
                {asset.admin_yn === "N" && (
                  <>
                    <button onClick={() => handleApprove(asset.asset_file_id)}>
                      승인
                    </button>
                    <button onClick={() => handleReject(asset.asset_file_id)}>
                      거절
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAssets;
