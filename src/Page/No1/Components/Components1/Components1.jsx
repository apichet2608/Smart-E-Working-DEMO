import React from "react";

function Components1(props) {
  const { handleClick } = props;

  return (
    <div className="Paper_Contents">
      <div
        className="w-full p-2 animate__animated animate__fadeIn"
        onClick={handleClick}
      >
        Components #1
      </div>
    </div>
  );
}

export default Components1;
