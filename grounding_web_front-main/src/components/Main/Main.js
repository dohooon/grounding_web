import React, { useEffect, useState } from "react";
import { fetchMyData } from "../../api/mainAPI"; // fetchMyData 함수 임포트
import "./Main.css";

function Main() {
  const [data, setData] = useState({
    estates: [],
    lands: [],
    profits: [],
    thumbnail_image: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchMyData();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  return (
    <div className="main-container">
      <h1>보유한 자산을 확인해보세요</h1>
      {error && <p className="error">Error: {error}</p>}
      <div>
        <h2>건물</h2>
        {data.estates && data.estates.length > 0 ? (
          <ul>
            {data.estates.map((estate) => (
              <li key={estate.investment_piece_id}>
                <p>
                  <span className="detail-label">Investment Piece ID:</span>{" "}
                  <span className="detail-value">
                    {estate.investment_piece_id}
                  </span>
                </p>
                <p>
                  <span className="detail-label">Register Date:</span>{" "}
                  <span className="detail-value">{estate.register_date}</span>
                </p>
                <p>
                  <span className="detail-label">Name:</span>{" "}
                  <span className="detail-value">{estate.name}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>보유한 건물이 없습니다</p>
        )}
      </div>
      <div>
        {data.thumbnail_image && data.thumbnail_image.length > 0 ? (
          <ul>
            {data.thumbnail_image.map((thumbnail) => (
              <li key={thumbnail.id}>
                <p>
                  <span className="detail-label">File Name:</span>{" "}
                  <img src={`https://${thumbnail.fileName}`} alt="thumnail" />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div>
        <h2>임야</h2>
        {data.lands && data.lands.length > 0 ? (
          <ul>
            {data.lands.map((land) => (
              <li key={land.investment_piece_id}>
                <p>
                  <span className="detail-label">등록일자:</span>{" "}
                  <span className="detail-value">{land.register_date}</span>
                </p>
                <p>
                  <span className="detail-label">매물명:</span>
                  <span className="detail-value">{land.name}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>보유한 임야가 없습니다</p>
        )}
      </div>
    </div>
  );
}

export default Main;
