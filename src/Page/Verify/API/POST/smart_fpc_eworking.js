import axios from "axios";

export const smart_fpc_eworking = async (requestData) => {
  try {
    const response = await axios.post(
      `http://10.17.66.242:7010/api/smart_fpc_eworking/`,
      requestData
    );

    // Check the response status code for success
    if (response.status === 200 || response.status === 201) {
      console.log(response); // Consider removing or replacing with a more appropriate logging mechanism for production
      const statusAPI = response.data.status; // Directly access the status

      if (statusAPI === "OK") {
        return response; // It might be more useful to return response.data instead of the whole response
      } else if (statusAPI === "ERROR") {
        return response;
      }
    }
  } catch (error) {
    console.error("Error in smart_fpc_eworking function:", error);
    return error; // Consider whether you want to return the error or throw it
  }
};
