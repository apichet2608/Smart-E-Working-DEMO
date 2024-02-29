import React from "react";

function TextInput(props) {
  const { values, onChanges, placeholders } = props;

  return (
    <>
      <input
        placeholder={placeholders}
        value={values}
        onChange={onChanges}
        className="Paper_Contents Input_text"
      />
    </>
  );
}

export default TextInput;
