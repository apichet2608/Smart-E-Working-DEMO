// ดึงรายการของคอลัมน์จาก header ของข้อมูล input
const columnsactvData = [
  ...new Set(actvData.flatMap((item) => Object.keys(item))),
]
  .filter(
    (header) =>
      ![
        "server",
        "process",
        "process_id",
        "roll",
        "first_lot",
        "end_lot",
        "id",
      ].includes(header)
  )
  .map((header) => ({
    field: header,
    headerName: header,
    width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
  }));
setcolumnsactvData(columnsactvData);

const columnsAlmData = [
  ...new Set(almData.flatMap((item) => Object.keys(item))),
].map((header) => ({
  field: header,
  headerName: header,
  width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
}));
setcolumnsAlmData(columnsAlmData);

// สร้างคอลัมน์ Data Grid สำหรับ setData
const columnsSetData = [
  ...new Set(setData.flatMap((item) => Object.keys(item))),
].map((header) => ({
  field: header,
  headerName: header,
  width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
}));
setcolumnsSetData(columnsSetData);

// สร้างคอลัมน์ Data Grid สำหรับ statusData โดยกรอง key ที่ไม่ใช่ server, process, process_id, roll, first_lot, end_lot
const columnsStatusData = [
  ...new Set(statusData.flatMap((item) => Object.keys(item))),
]
  .filter(
    (header) =>
      ![
        "server",
        "process",
        "process_id",
        "roll",
        "first_lot",
        "end_lot",
        "id",
      ].includes(header)
  )
  .map((header) => ({
    field: header,
    headerName: header,
    width: 150, // กำหนดความกว้างของคอลัมน์ตามต้องการ
  }));
setcolumnsStatusData(columnsStatusData);
