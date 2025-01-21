import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { getEachDayTrading } from "../../api/chartAPI";
import { useQuery } from "react-query";

function InfoChart() {
  const { name } = useParams();
  const propertyName = name;
  const navigate = useNavigate();

  const location = useLocation();
  const { asset } = location.state;
  console.log(asset);

  const goToChart = () =>
    navigate(`/info-chart/${propertyName}`, { state: { asset } });
  const goToDisclosure = () =>
    navigate(`/info-disclosure/${propertyName}`, { state: { asset } });

  const fetchEachDayTrading = async ({ queryKey }) => {
    const [, propertyName, page, size] = queryKey;
    if (!propertyName) throw new Error("Property ID is required");
    return await getEachDayTrading(propertyName, page, size);
  };

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 200,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: undefined,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MM/dd",
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => `${value.toFixed(0)}원`, // 레이블 포맷 한국어로 표시
      },
      opposite: true, // y축을 오른쪽으로 이동
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#ff4560", // 상승 캔들 색상
          downward: "#008ffb", // 하락 캔들 색상
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM HH:mm",
      },
    },
  };

  const { data: eachDayTradingData } = useQuery(
    ["eachDayTrading", "예시 임야", 0, 100],
    fetchEachDayTrading,
    {
      refetchInterval: 20000,
      onError: (error) =>
        console.error("Error fetching each day's trading data:", error),
    }
  );

  const transformedData =
    eachDayTradingData &&
    eachDayTradingData.content.map((item) => ({
      x: new Date(item.date),
      y: [
        item.opening_price,
        item.max_price,
        item.min_price,
        item.closing_price,
      ],
    }));

  return (
    <div className="asset-details ">
      <h2>차트</h2>
      <p>이 페이지는 자산의 가격 변동을 나타냅니다.</p>
      <div className="navigation-links">
        <button onClick={goToChart} className={"active"}>
          차트
        </button>
        <button onClick={goToDisclosure}>공시</button>
      </div>

      <ReactApexChart
        options={chartOptions}
        series={[{ data: transformedData ?? [] }]}
        type="candlestick"
        height="230px"
      />
    </div>
  );
}

export default InfoChart;
