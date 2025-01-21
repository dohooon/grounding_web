import React, { useEffect, useState } from "react";
import { getApprovedAssets } from "../../api/investmentAPI";
import "./Listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedAssets = async () => {
      try {
        const data = await getApprovedAssets();
        // 에스테이트와 랜드 각각에 '자산 타입' 속성을 추가
        const estates = data.estates.map((estate) => ({
          ...estate,
          assetType: "건물",
        }));
        const lands = data.lands.map((land) => ({
          ...land,
          assetType: "임야",
        }));
        const combinedAssets = [...estates, ...lands];
        setListings(combinedAssets);
      } catch (error) {
        setError("자산을 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching approved assets:", error);
      }
    };

    fetchApprovedAssets();
  }, []);
  return (
    <div className="listings-container">
      <h1>모집 중인 매물</h1>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>매물 이름</th>
            <th>자산 타입</th>
          </tr>
        </thead>
        <tbody>
          {listings.length === 0 ? (
            <tr>
              <td colSpan="4">등록된 자산이 없습니다.</td>
            </tr>
          ) : (
            listings.map((listing, index) => (
              <tr key={index}>
                <td>{listing.asset_name}</td>
                <td>{listing.assetType}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Listings;
