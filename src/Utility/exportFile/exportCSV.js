// Exported function to handle CSV export
import Papa from "papaparse";
import { formatDateTime } from "../formatDate/formatDate";

export const handleExportCSV = (data, name) => {
  if (data.length > 0) {
    const csvDay = Papa.unparse(data);
    const currentDateTime = formatDateTime(Date.now());
    const fileName = `${name}_${currentDateTime}.csv`;
    const csvdata = new Blob([csvDay], {
      type: "text/csv;charset=utf-8;",
    });
    const csvURLDay = window.URL.createObjectURL(csvdata);
    const tempLinkDay = document.createElement("a");
    tempLinkDay.href = csvURLDay;
    tempLinkDay.setAttribute("download", fileName);
    tempLinkDay.click();
  }
};

// ตัวอย่างการใช้งานฟังก์ชัน exportToExcel
// exportToExcel(data, "fileName");
