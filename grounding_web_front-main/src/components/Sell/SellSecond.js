import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAsset, addAssetFile } from "../../api/investmentAPI"; // API 함수 임포트
import "./SellSecond.css";

function SellSecond() {
  const [formData, setFormData] = useState(() => {
    const fd = new FormData();
    return fd;
  });

  const [assetData, setAssetData] = useState({
    asset_name: "", //자산명
    type: "",
    location: "", //위치
    price: 0,
    info: "",
    floors: 0, //층수
    piece_count: 0, //조각판매개수
    use_area: "", //용도지역
    main_use: "", //주용도
    land_area: 0, //대지면적
    total_area: 0, //연면적
    building_to_land_ratio: 0, //  건폐율
    floor_area_ratio: 0, //용적률
    building_date: "", //준공일
    automatic_close_flag: false, //모집 마감시 자동 마감
    asset_type: "", //자산 종류
    entry_status: "",
    land_classification: "", //지목 종류
    recommended_use: "", //추천용도
    desired_price: "", //조각판매희망가격
    price_per_unit: 0, //조각당 가격
    one_line: "", //한 줄 설명
    land_image_registration: "", //임야 사진 등록
    lease_start_date: "", //공시시작일
    lease_end_date: "", //공시종료일
    asset_image: "", // 파일 업로드를 위한 필드
    asset_certificate_url: "", // 파일 업로드를 위한 필드
    parking_availability: "", //주차 가능 여부
    nearest_station: "", //가장 가까운 기차역
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setAssetData((prevData) => ({
      ...prevData,
      [name]: files[0].name,
    }));

    if (files.length > 0) {
      if (name === "asset_image") {
        formData.delete("image_files");
        // 선택된 모든 파일을 formData에 추가
        Array.from(files).forEach((file) => {
          formData.append("image_files", file);
        });
      } else if (name === "asset_certificate_url") {
        formData.set("file_name", files[0]);
      }
      setFormData(formData);
    }
  };

  const handleNext = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await addAsset(assetData);

      formData.append("piece_investment_id", res.property_id);
      localStorage.setItem("pieceInvestmentId", res.property_id);
      await addAssetFile(formData);

      alert("자산 등록이 완료되었습니다.");
      navigate("/SellThird");
    } catch (error) {
      alert("자산 등록에 실패했습니다.");
    }
  };

  const renderCommonFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="asset_name">
          자산 이름<span>*</span>
        </label>
        <input
          type="text"
          id="asset_name"
          name="asset_name"
          value={assetData.asset_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="unitPrice">조각당 가격</label>
        <input
          type="number"
          id="unitPrice"
          name="price_per_unit"
          value={assetData.price_per_unit}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assetLocation">
          자산 위치<span>*</span>
        </label>
        <input
          type="text"
          id="assetLocation"
          name="location"
          value={assetData.location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="autoClose">모집 마감시 자동 마감</label>
        <input
          type="checkbox"
          id="autoClose"
          name="automatic_close_flag"
          checked={assetData.automatic_close_flag}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="info">자산 정보</label>
        <input
          type="text"
          id="info"
          name="info"
          value={assetData.info}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pieceCount">조각 수량</label>
        <input
          type="number"
          id="pieceCount"
          name="piece_count"
          value={assetData.piece_count}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="desiredPrice">
          희망 가격<span>*</span>
        </label>
        <input
          type="text"
          id="desiredPrice"
          name="desired_price"
          value={assetData.desired_price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="leaseStartDate">
          임대 시작일<span>*</span>
        </label>
        <input
          type="date"
          id="leaseStartDate"
          name="lease_start_date"
          value={assetData.lease_start_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="leaseEndDate">
          임대 종료일<span>*</span>
        </label>
        <input
          type="date"
          id="leaseEndDate"
          name="lease_end_date"
          value={assetData.lease_end_date}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderestatesFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="floor">층수</label>
        <input
          type="text"
          id="floor"
          name="floors"
          value={assetData.floors}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="usageArea">용도지역</label>
        <input
          type="text"
          id="usageArea"
          name="use_area"
          value={assetData.use_area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mainPurpose">주용도</label>
        <input
          type="text"
          id="mainPurpose"
          name="main_use"
          value={assetData.main_use}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="landArea">대지면적</label>
        <input
          type="text"
          id="landArea"
          name="land_area"
          value={assetData.land_area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalArea">연면적</label>
        <input
          type="text"
          id="totalArea"
          name="total_area"
          value={assetData.total_area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="coverageRatio">건폐율</label>
        <input
          type="text"
          id="coverageRatio"
          name="building_to_land_ratio"
          value={assetData.building_to_land_ratio}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="floorAreaRatio">용적률</label>
        <input
          type="text"
          id="floorAreaRatio"
          name="floor_area_ratio"
          value={assetData.floor_area_ratio}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="completionDate">
          준공일<span>*</span>
        </label>
        <input
          type="date"
          id="completionDate"
          name="building_date"
          value={assetData.building_date}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderlandsFields = () => (
    <>
      <div className="form-group">
        <label htmlFor="locationAddress">위치주소</label>
        <input
          type="text"
          id="locationAddress"
          name="location"
          value={assetData.location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="landArea">면적</label>
        <input
          type="text"
          id="landArea"
          name="land_area"
          value={assetData.land_area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="landDesignation">지목</label>
        <select
          id="landDesignation"
          name="land_classification"
          value={assetData.land_classification}
          onChange={handleChange}
        >
          <option value="">선택</option>
          <option value="전">전</option>
          <option value="답">답</option>
          <option value="과수원">과수원</option>
          <option value="목장용지">목장용지</option>
          <option value="임야">임야</option>
          <option value="대지">대지</option>
          <option value="공장용지">공장용지</option>
          <option value="학교용지">학교용지</option>
          <option value="도로">도로</option>
          <option value="철도용지">철도용지</option>
          <option value="제방">제방</option>
          <option value="하천">하천</option>
          <option value="구거">구거</option>
          <option value="유지">유지</option>
          <option value="묘지">묘지</option>
          <option value="잡종지">잡종지</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="recommendation">추천용도</label>
        <input
          type="text"
          id="recommendation"
          name="recommended_use"
          value={assetData.recommended_use}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="otherNote">한줄 소개</label>
        <input
          type="text"
          id="otherNote"
          name="one_line"
          value={assetData.one_line}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="checkbox"
          id="entranceRoad"
          name="entrance_road"
          checked={assetData.entrance_road}
          onChange={handleChange}
        />
        <label htmlFor="entranceRoad">진입로 유무 (있을 시 체크)</label>
      </div>
      <div className="form-group">
        <label htmlFor="parkingAvailability">주위 주차 가능 여부</label>
        <input
          type="text"
          id="parkingAvailability"
          name="parking_availability"
          value={assetData.parking_availability}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nearestStation">가장 가까운 기차역</label>
        <input
          type="text"
          id="nearestStation"
          name="nearest_station"
          value={assetData.nearest_station}
          onChange={handleChange}
        />
      </div>
    </>
  );

  return (
    <div className="sell-container">
      <h1>그라운딩에 등록할 매물 정보를 입력해주세요</h1>
      <div className="progress-container">
        <div className="step">
          <div className="circle filled"></div>
        </div>
        <div className="line filled"></div>
        <div className="step">
          <div className="circle filled"></div>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle"></div>
        </div>
      </div>
      <div className="asset-type-group">
        <label id="asset-type">
          자산 종류<span>*</span>
        </label>

        <label htmlFor="estates">
          <input
            type="radio"
            id="estates"
            name="asset_type"
            value="ESTATE"
            checked={assetData.asset_type === "ESTATE"}
            onChange={handleChange}
          />
          아파트
        </label>
        <label htmlFor="lands">
          <input
            type="radio"
            id="lands"
            name="asset_type"
            value="LAND"
            checked={assetData.asset_type === "LAND"}
            onChange={handleChange}
          />
          임야
        </label>
      </div>

      {renderCommonFields()}
      {assetData.asset_type === "ESTATE" && renderestatesFields()}
      {assetData.asset_type === "LAND" && renderlandsFields()}

      <div className="form-group">
        <label htmlFor="asset_image">
          자산 이미지<span>*</span>
        </label>
        <input
          multiple
          type="file"
          id="asset_image"
          name="asset_image"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="asset_certificate_url">
          자산 증명서<span>*</span>
        </label>
        <input
          type="file"
          id="asset_certificate_url"
          name="asset_certificate_url"
          onChange={handleFileChange}
        />
      </div>
      <div className="button-container">
        <button onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}

export default SellSecond;
