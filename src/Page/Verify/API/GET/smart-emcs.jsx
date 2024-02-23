import axios from "axios";

const getDataemcs = async (
  proc_id,
  lot_prd_name,
  lot_prd_name_split,
  mc_code,
  line
) => {
  const params = { proc_id, lot_prd_name, lot_prd_name_split, mc_code, line };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7011/api/ewk/smart-emcs/`,
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

export default getDataemcs; // Export ฟังก์ชันให้สามารถใ
