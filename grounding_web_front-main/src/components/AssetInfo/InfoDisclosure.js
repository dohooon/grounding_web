import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDisclosureInfo } from "../../api/investmentAPI"; // API 함수 임포트
import "./InfoDisclosure.css";

function InfoDisclosure() {
  const { name } = useParams();
  const location = useLocation();
  const { asset } = location.state;
  const propertyName = name;

  const navigate = useNavigate();
  const [disclosures, setDisclosures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const pieceInvestmentId = asset.invested_piece_id;
        const data = await getDisclosureInfo(pieceInvestmentId);
        console.log("disclosures", data);
        setDisclosures(data);
      } catch (error) {
        setError("Error fetching disclosure info");
        console.error("Error fetching disclosure info:", error);
      }
    };

    fetchDisclosures();
  }, [location.state, asset.invested_piece_id]);

  const handleWriteDisclosure = () => {
    navigate("/write-disclosure", {
      state: { pieceInvestmentId: location.state.pieceInvestmentId },
    });
  };

  const goToChart = () =>
    navigate(`/info-chart/${propertyName}`, { state: { asset } });
  const goToDisclosure = () =>
    navigate(`/info-disclosure/${propertyName}`, { state: { asset } });

  return (
    <div className="asset-details">
      <h2>공시</h2>
      <p>이 페이지는 자산에 관련된 공시 정보를 나타냅니다.</p>

      <div className="navigation-links">
        <button onClick={goToChart}>차트</button>
        <button onClick={goToDisclosure} className={"active"}>
          공시
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <button
        onClick={handleWriteDisclosure}
        className="write-disclosure-button"
      >
        공시 작성
      </button>

      {disclosures.length > 0 ? (
        <ul className="disclosure-list">
          {disclosures.map((disclosure) => (
            <li key={disclosure.id} className="disclosure-item">
              <h3>{disclosure.disclosure_title}</h3>
              <p>{disclosure.disclosure_content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>공시 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default InfoDisclosure;
