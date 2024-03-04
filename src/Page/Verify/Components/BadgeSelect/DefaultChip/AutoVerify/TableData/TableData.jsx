import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DateCell from "./customcolumn/DateCell/DateCell";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function TableCheck({ Datas, isDarkMode }) {
  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    // { field: "create_at", headerName: "Created At", width: 200 },
    // { field: "update_at", headerName: "Updated At", width: 200 },
    // { field: "jwpv_proc_group", headerName: "Procedure Group", width: 200 },
    // { field: "jwpv_param_code", headerName: "Parameter Code", width: 200 },
    // { field: "jwpv_param_name", headerName: "Parameter Name", width: 200 },
    {
      field: "jwpv_param_title",
      headerName: "Parameter Title",
      width: 350,
    },

    {
      field: "jwpv_param_value",
      headerName: "Value",
      width: 150,
      renderCell: (params) => {
        // ตรวจสอบว่าค่าเป็น null หรือไม่
        if (params.value === null) {
          return <div></div>; // แสดงช่องว่างหากค่าเป็น null
        } else {
          // แปลงค่าเป็นทศนิยมสองตำแหน่งหากค่าไม่เป็น null
          return <div>{parseFloat(params.value).toFixed(2)}</div>;
        }
      },
    },

    {
      field: "jwpv_param_tvalue",
      headerName: "Report",
      width: 150,
      renderCell: (params) => {
        let backgroundColor = ""; // สีพื้นหลังเริ่มต้นเป็นสีว่าง
        if (
          params.row.jwpv_param_title === "Next Due" &&
          new Date(params.row.jwpv_param_tvalue) > new Date()
        ) {
          backgroundColor = "#F15A59"; // ถ้าเป็น "Next Due" และมากกว่าวันที่ปัจจุบัน กำหนดสีเป็นแดง
        }
        return (
          <div
            style={{
              backgroundColor,
              padding: "8px", // เพิ่ม padding ให้กับเซลล์
              margin: "2px", // เพิ่ม margin รอบๆ เซลล์
              borderRadius: "4px", // เพิ่มขอบมนเล็กน้อย
              color: backgroundColor === "#F15A59" ? "#ffffff" : "#000", // สีของตัวอักษร ถ้า backgroundColor เป็นสีแดงให้เป็นขาว ถ้าไม่ใช่ให้เป็นดำ
              // textAlign: "center", // จัดให้ตัวอักษรตรงกลาง
              fontWeight: "bold", // ตั้งให้ตัวอักษรหนา
            }}
          >
            {params.value}
          </div>
        );
      },
    },

    // { field: "is_send", headerName: "Is Send", width: 100 },
    // { field: "jwpv_dept", headerName: "Department", width: 200 },
    // { field: "jwpv_job_type", headerName: "Job Type", width: 200 },
    // { field: "jwpv_lock", headerName: "Lock", width: 100 },
    // { field: "update_file", headerName: "Update File", width: 200 },
    // { field: "jwpv_mc_code", headerName: "MC Code", width: 100 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={Datas}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        getRowHeight={() => "auto"}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #e0e0e0",
            // borderTop: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid #e0e0e0",
            borderTop: "1px solid #e0e0e0",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "#3371ff",
            fontSize: "14px",
            textAlign: "center",
            FontFace: "Poppins",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          backgroundColor: isDarkMode ? "#fff" : "#fff",
        }}
      />
    </div>
  );
}

export default TableCheck;
