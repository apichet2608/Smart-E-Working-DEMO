import React from "react";
import Components1 from "../Components/Components1/Components1";
import Grid from "@mui/material/Grid";

function No1() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
        <Components1 />
      </Grid>
    </Grid>
  );
}

export default No1;
