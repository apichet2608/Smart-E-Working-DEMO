import axios from "axios";

const getDatalotsearch = async (lot, is_roll) => {
  const params = { lot, is_roll };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7011/api/ewk/smart-fpc-lot/`,
    headers: {
      "Content-Type": "application/json",
    },
    params, // ใช้ shorthand syntax ใน ES6
  };

  try {
    const response = await axios.request(config);
    if (response.data.status === "OK") {
      return {
        status: "OK",
        data: response.data,
        message: response.data.message,
      };
    } else {
      return {
        status: "ERROR",
        data: response.data,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return {
      status: "Catch",
      data: [],
      message: error.message,
    };
  }
};

export default getDatalotsearch; // Export ฟังก์ชันให้สามารถใ
