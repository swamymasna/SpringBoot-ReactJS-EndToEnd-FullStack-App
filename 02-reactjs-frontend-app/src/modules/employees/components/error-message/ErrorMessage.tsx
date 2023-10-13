import React from "react";

interface IProps {
  message: any;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col text-center">
            <h2 className="text-danger">{props.message}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
