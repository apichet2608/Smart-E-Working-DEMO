import axios from "axios";
const CheckSeq = async (data) => {
  // เปลี่ยนพารามิเตอร์ url เป็น string
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://10.17.66.242:7010/api/ewk/smart-ewk-id-status/`, // เปลี่ยนการกำหนด url เป็นตัวแปร url
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response);
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

export default CheckSeq; // Export ฟังก์ชันให้สามารถใ

// if (response_data.status === "OK") {

// } else if (response_data.status === "ERROR") {

// } else {

// }
