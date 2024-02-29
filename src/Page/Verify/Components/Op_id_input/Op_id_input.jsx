import React, { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PublishIcon from "@mui/icons-material/Publish";
function Op_id_input() {
  const [opData, setOpData] = useState([{ id: "", password: "" }]);
  // if ("BarcodeDetector" in window) {
  //   // BarcodeDetector is supported
  //   BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
  //     supportedFormats.forEach((format) => console.log(format));
  //   });
  // } else {
  //   // BarcodeDetector is not supported
  //   console.log("BarcodeDetector is not supported by this browser.");
  // }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...opData];
    newData[index][name] = value;
    console.log(newData);
    console.log(name);
    console.log(value);
    console.log(index);

    setOpData(newData);
  };

  const handleAddInput = () => {
    setOpData([...opData, { id: "", password: "" }]);
  };

  const handleRemoveInput = (index) => {
    const newData = [...opData];
    newData.splice(index, 1);
    setOpData(newData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted OP Data:", opData);
  };

  return (
    <form className="Paper_Contents w-full" onSubmit={handleSubmit}>
      {opData.map((data, index) => (
        <div key={index}>
          <input
            type="text"
            name="id"
            value={data.id}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="OP ID"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            // onClick={() => handleRemoveInput(index)}
            className=" mr-1"
          >
            <PersonSearchIcon />
          </button>
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveInput(index)}>
              <PersonRemoveIcon />
            </button>
          )}
        </div>
      ))}
      <div className=" gap-2 flex pt-1">
        <button type="button" onClick={handleAddInput} className="btn btn-sm">
          Add More
          <GroupAddIcon />
        </button>
        <button type="submit" className="btn btn-sm">
          <PublishIcon />
        </button>
      </div>
      {/* <div>
        <button type="submit">Submit</button>
      </div> */}
    </form>
  );
}

export default Op_id_input;
