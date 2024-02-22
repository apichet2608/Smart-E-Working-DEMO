import React from "react";
import Components1 from "../Components/Components1/Components1";
function No1() {
  const handlesampleClick = () => {
    console.log("Done");
    alert("Done");
  };

  return (
    <div className="container mx-auto">
      <Components1 handleClick={handlesampleClick} />
    </div>
  );
}

export default No1;
