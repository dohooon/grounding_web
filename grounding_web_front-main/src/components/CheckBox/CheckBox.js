import React from "react";
import "./styles.css";

const Checkbox = ({ id, label, checked, setIsChecked }) => {
  const onChange = () => {
    setIsChecked(!checked);
  };

  return (
    <div className="checkboxContainer">
      <input
        id={id}
        className="customCheckbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="checkboxLabel">
        <div>{label}</div>
      </label>
    </div>
  );
};

export default Checkbox;
