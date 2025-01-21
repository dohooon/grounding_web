import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sell.css";
import check from "../../asset/icon/check.png";
import fillCheck from "../../asset/icon/check-fill.png";
import Checkbox from "../../components/CheckBox/CheckBox";

function Sell() {
  const navigate = useNavigate();
  const [allAgreed, setAllAgreed] = useState(false);

  const handleNext = () => {
    if (allAgreed) {
      navigate("/SellSecond");
    }
  };

  return (
    <div className="sell-container">
      <h1>매물을 등록하기 전에 약관에 동의해주세요</h1>
      <div className="progress-container">
        <div className="step">
          <div className="circle filled"></div>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle"></div>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle"></div>
        </div>
      </div>

      <div className="SignInTabWrapper">
        <div className="allAgree">
          <Checkbox
            label=""
            id={"allAgree"}
            checked={allAgreed}
            setIsChecked={setAllAgreed}
          />
          <div>
            <label htmlFor="allAgree">
              <div className="allAgreeText">모두 동의합니다</div>

              <div className="agreeText">
                전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
                개별적으로도 동의를 선택하실 수 있습니다.
              </div>
            </label>
          </div>
        </div>

        <ul className="termsList">
          <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
            <img
              src={allAgreed ? fillCheck : check}
              alt="check"
              style={{ width: "24px", height: "24px" }}
            />
            (필수) 만 18세 이상입니다.
          </li>
          <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
            <img
              src={allAgreed ? fillCheck : check}
              alt="check"
              style={{ width: "24px", height: "24px" }}
            />
            (필수) 개인정보 수집 및 이용 동의
          </li>
          <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
            <img
              src={allAgreed ? fillCheck : check}
              alt="check"
              style={{ width: "24px", height: "24px" }}
            />{" "}
            (필수) 서비스 이용약관 동의
          </li>
          <li className={`termsItem ${allAgreed ? "valid" : ""}`}>
            <img
              src={allAgreed ? fillCheck : check}
              alt="check"
              style={{ width: "24px", height: "24px" }}
            />
            (선택) 혜택/이벤트 정보 수신 동의
          </li>
        </ul>
      </div>
      <div className="button-container">
        <button
          onClick={handleNext}
          className={`button ${allAgreed ? "active" : ""}`}
          disabled={!allAgreed}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Sell;
