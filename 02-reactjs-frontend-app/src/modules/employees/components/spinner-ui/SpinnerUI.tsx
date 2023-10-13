import React from "react";
import spinnerImg from "../../../../assets/img/spinner.jpg";

const SpinnerUI:React.FC = () => {
  return (
    <div className="spinner">
      <img src={spinnerImg} alt="" />
    </div>
  );
};

export default SpinnerUI;
