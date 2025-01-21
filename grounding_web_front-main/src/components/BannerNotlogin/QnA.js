import React from "react";
import "./QnA.css";
import Accordion from "../Accordian/Accordian";

function QnA() {
  const items = [
    {
      title: "조각 판매는 무엇인가요?",
      content:
        "조각 판매는 자산의 소유권을 여러 조각으로 나누어 여러 투자자에게 판매하는 것을 의미합니다.",
    },
    {
      title: "어떻게 조각 판매에 참여할 수 있나요?",
      content:
        "회원 가입 후, 원하는 자산의 조각을 선택하고 구매 절차를 따르면 됩니다.",
    },
    {
      title: "조각 판매의 최소 투자 금액은 얼마인가요?",
      content:
        "최소 투자 금액은 자산에 따라 다르며, 각 자산의 상세 페이지에서 확인할 수 있습니다.",
    },
    {
      title: "투자한 조각은 언제 판매할 수 있나요?",
      content:
        "투자한 조각은 일정 기간 이후에 2차 시장에서 판매할 수 있습니다. 판매 가능 시기는 각 자산에 따라 다릅니다.",
    },
    {
      title: "조각 판매 수익은 어떻게 분배되나요?",
      content:
        "수익은 투자한 조각의 비율에 따라 분배됩니다. 수익 분배 일정은 자산의 조건에 따라 다릅니다.",
    },
  ];
  return (
    <div className="faq-container">
      <h2>자주 묻는 질문</h2>
      <Accordion items={items} />
    </div>
  );
}

export default QnA;
