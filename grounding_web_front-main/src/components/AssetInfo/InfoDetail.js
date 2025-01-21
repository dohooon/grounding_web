import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./InfoDetail.css";

function InfoDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const propertyName = name;
  const [assetData, setAssetData] = useState(null);
  const location = useLocation();
  const { asset } = location.state;

  useEffect(() => {
    const selectedAsset = JSON.parse(localStorage.getItem("selectedAsset"));
    if (selectedAsset) {
      setAssetData(selectedAsset);
    }
  }, []);

  const goToChart = () =>
    navigate(`/info-chart/${propertyName}`, { state: { asset } });
  const goToDetail = () =>
    navigate(`/info-detail/${propertyName}`, { state: { asset } });
  const goToDisclosure = () =>
    navigate(`/info-disclosure/${propertyName}`, { state: { asset } });

  return (
    <div className="asset-details">
      <h2>종목 정보</h2>
      <p>이 페이지는 종목에 대한 상세 정보를 나타냅니다.</p>

      <div className="navigation-links">
        <button onClick={goToChart}>차트</button>
        <button onClick={goToDetail} className={"active"}>
          종목 정보
        </button>
        <button onClick={goToDisclosure}>공시</button>
      </div>

      {assetData && (
        <div>
          <h3>자산 정보</h3>
          <div className="detail-item">
            <span className="detail-label">총 가격:</span>
            <span className="detail-value">{assetData.totalPrice}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">조각당 가격:</span>
            <span className="detail-value">{assetData.unitPrice}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">자산 종류:</span>
            <span className="detail-value">
              {assetData.assetType === "esates" ? "아파트" : "임야"}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">판매량:</span>
            <span className="detail-value">{assetData.sellAmount}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">자산 위치:</span>
            <span className="detail-value">{assetData.assetLocation}</span>
          </div>
          {/* Additional fields for estates */}
          {assetData.assetType === "estates" && (
            <>
              <div className="detail-item">
                <span className="detail-label">층수:</span>
                <span className="detail-value">{assetData.floor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">용도지역:</span>
                <span className="detail-value">{assetData.usageArea}</span>
              </div>
              {/* Add other estates specific fields here */}
            </>
          )}
          {/* Additional fields for lands */}
          {assetData.assetType === "lands" && (
            <>
              <div className="detail-item">
                <span className="detail-label">위치주소:</span>
                <span className="detail-value">
                  {assetData.locationAddress}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">면적:</span>
                <span className="detail-value">{assetData.area}</span>
              </div>
              {/* Add other lands specific fields here */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default InfoDetail;
