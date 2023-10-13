import React from "react";
import notfoundImg from "../../../../assets/img/notfound-404.gif";

const NotFound404: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <img src={notfoundImg} width={500} height={500} alt="" />
      </div>
    </>
  );
};

export default NotFound404;
