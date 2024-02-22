import React from "react";
import TextField from "@mui/material/TextField";

function TextInput({
  onChanges,
  values,
  ids,
  labels,
  autoCompletes,
  names,
  types,
}) {
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={ids}
        label={labels}
        name={names}
        autoComplete={autoCompletes}
        autoFocus
        value={values}
        onChange={onChanges}
        sx={{ width: "100%" }}
        types={types}
      />
    </div>
  );
}

export default TextInput;
