import { formatDateTime, formatDateOnly } from "./formatDate.js";

export const autoFormatDate = (inputDate) => {
  if (inputDate !== null) {
    const hasTime = inputDate.includes("T") || inputDate.includes(" ");
    if (hasTime) {
      return formatDateTime(inputDate);
    } else {
      return formatDateOnly(inputDate);
    }
  }
  return null;
};
