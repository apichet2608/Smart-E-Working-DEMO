// Exported function to handle CSV export
import { formatDateTime } from "../formatDate/formatDate";

export const handleExportTextFile = (data, name) => {
  if (data.length > 0) {
    const textData = data
      .map((item) => {
        // Check if item has the expected properties
        if (item && item.file_name && item.txt_file) {
          return `${item.txt_file}`;
        } else {
          return ""; // or handle it differently based on your requirements
        }
      })
      .join("\n");
    const currentDateTime = formatDateTime();
    const fileName = `${name}.txt`;
    // const fileName = `${name}_${currentDateTime}.txt`;\
    const textBlob = new Blob([textData], {
      type: "text/plain;charset=utf-8",
    });

    const textURL = window.URL.createObjectURL(textBlob);
    const tempLink = document.createElement("a");
    tempLink.href = textURL;
    tempLink.setAttribute("download", fileName);
    tempLink.click();
  }
};
