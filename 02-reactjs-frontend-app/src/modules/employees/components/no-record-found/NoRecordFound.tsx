import React from "react";
import noRecordFoundImg from "../../../../assets/img/NoRecordFound.jpg";

const NoRecordFound = () => {
  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col text-center noRecordFoundImg">
            <img src={noRecordFoundImg} height={500} width={500} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecordFound;
