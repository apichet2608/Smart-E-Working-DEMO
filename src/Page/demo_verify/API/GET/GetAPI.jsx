import axios from "axios";
const GetAPI = async (params, url) => {
  // เปลี่ยนพารามิเตอร์ url เป็น string
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url, // เปลี่ยนการกำหนด url เป็นตัวแปร url
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

export default GetAPI; // Export ฟังก์ชันให้สามารถใ

// if (response_data.status === "OK") {

// } else if (response_data.status === "ERROR") {

// } else {

// }
