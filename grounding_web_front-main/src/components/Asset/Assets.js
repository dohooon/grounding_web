import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAssets } from "../../api/investmentAPI"; // API 함수 임포트
import "./Assets.css";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const userAssets = await getUserAssets();
        const combinedAssets = [...userAssets.estates, ...userAssets.lands];
        setAssets(combinedAssets);
      } catch (error) {
        setError("자산을 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching assets:", error);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    fetchAssets();
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (assets.length === 0) {
    return <div className="no-assets">보유한 자산이 없습니다.</div>;
  }

  const handleAssetClick = (asset) => {
    navigate(`/info-chart/${asset.asset_name}`, { state: { asset } });
  };

  return (
    <div className="assets-container">
      <h2>자산 관리</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>자산 이름</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index} onClick={() => handleAssetClick(asset)}>
              <td>{index + 1}</td>
              <td>{asset.asset_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assets;
