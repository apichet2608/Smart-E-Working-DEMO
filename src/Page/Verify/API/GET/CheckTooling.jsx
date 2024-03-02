import axios from "axios";

const CheckTooling = async (proc_grp_name, scan_job_id) => {
  const params = { proc_grp_name, scan_job_id };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:3000/api/smart_ewk_scan_master_header/CheckTooling/`,
    headers: {
      "Content-Type": "application/json",
    },
    params, // ใช้ shorthand syntax ใน ES6
  };

  try {
    const response = await axios.request(config);
    if (response.data.status === "OK") {
      console.log(response);
      return response.data; // คืนค่าข้อมูลกลับไป
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};

export default CheckTooling; // Export ฟังก์ชันให้สามารถใ
