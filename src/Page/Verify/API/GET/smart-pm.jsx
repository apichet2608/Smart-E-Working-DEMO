import axios from "axios";

const getDataPM = async (mc_code) => {
  const params = { mc_code };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7010/api/ewk/smart-pm/`,
    headers: {
      "Content-Type": "application/json",
    },
    params, // ใช้ shorthand syntax ใน ES6
  };

  try {
    const response = await axios.request(config);
    if (response.data.status === "OK") {
      console.log(response);
      return {
        status: "OK",
        data: response.data,
        message: response.data.message,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};

export default getDataPM; // Export ฟังก์ชันให้สามารถใ
