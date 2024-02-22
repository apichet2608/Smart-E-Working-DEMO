import * as XLSX from "xlsx";
import { formatDateTime } from "../formatDate/formatDate";

// ฟังก์ชันสำหรับ export ข้อมูลเป็น Excel
export const exportToExcel = (data, fileName) => {
  // สร้าง worksheet จากข้อมูล
  const currentDateTime = formatDateTime(Date.now());
  const ws = XLSX.utils.json_to_sheet(data);

  // สร้าง workbook และเพิ่ม worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // สร้าง Excel file และทำการ export
  XLSX.writeFile(wb, `${fileName}_${currentDateTime}.xlsx`);
};

// ตัวอย่างการใช้งานฟังก์ชัน exportToExcel
// exportToExcel(data, "fileName");
