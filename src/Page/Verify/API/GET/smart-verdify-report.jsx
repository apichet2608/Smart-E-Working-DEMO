import axios from "axios";

const getDataVerify = async (mc_code, proc_grp_name) => {
  const params = { mc_code, proc_grp_name };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7011/api/ewk/smart-verdify-report/`,
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
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};

export default getDataVerify; // Export ฟังก์ชันให้สามารถใ
