import axios from "axios";

const getDatalotsearch = async (lot, is_roll) => {
  const params = { lot, is_roll };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7010/api/ewk/smart-fpc-lot/`,
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

export default getDatalotsearch; // Export ฟังก์ชันให้สามารถใ
