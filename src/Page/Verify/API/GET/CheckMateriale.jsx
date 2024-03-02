import axios from "axios";

const CheckMateriale = async (proc_grp_name, scan_job_id) => {
  const params = { proc_grp_name, scan_job_id };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:3000/api/smart_ewk_scan_master_header/CheckMateriale/`,
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

export default CheckMateriale; // Export ฟังก์ชันให้สามารถใ
