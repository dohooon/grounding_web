import React, { useState } from "react";
import "./styles.css";
import smallArrow from "../../asset/icon/small-arrow.svg";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className="AccordionTitleWrapper"
            onClick={() => onTitleClick(index)}
          >
            <div className={`title ${index === activeIndex ? "active" : ""}`}>
              {item.title}
            </div>
            <img
              className={`arrowIcon ${index === activeIndex ? "rotated" : ""}`}
              src={smallArrow}
              alt="smallArrow"
            />
          </div>
          <div
            className={`accordionContent ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <p>{item.content}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
