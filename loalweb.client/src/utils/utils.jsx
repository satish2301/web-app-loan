import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = ({ children }) => {
  const location = useLocation();
  // console.log(location)
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log(window.scrollTo(0,0));
  }, [location]);
  return <>{children}</>;
};
export const LogOut = () => {
  sessionStorage.clear();
};

export const EncryptionData = async (body, textData) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(textData),
    { name: "AES-CBC", length: 256 },
    false,
    ["encrypt"]
  );
  const iv = new Uint8Array(16);
  const data = new TextEncoder().encode(JSON.stringify(body));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    data
  );
  return encryptedData;
};
export const ArrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const Loading = () => (
  <div className="loader-wrp" id="preloader">
    <div className="dmt_D">D</div>
    <div className="dmt_M">M</div>
    <div className="dmt_T">T</div>
  </div>
);

export const DateFormate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0"); // Get the day with leading zero if needed
  const monthIndex = currentDate.getMonth(); // Get the month index (0-based)
  const year = currentDate.getFullYear(); // Get the full year

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[monthIndex]; // Get the month name from the array

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate; // Output: "06 Feb 2024"
};

export const DateTimeFormate = (dateStr) => {
  const currentDate = new Date(dateStr);

  const day = currentDate.getDate().toString().padStart(2, "0"); // Get the day with leading zero if needed
  const monthIndex = currentDate.getMonth(); // Get the month index (0-based)
  const year = currentDate.getFullYear(); // Get the full year

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[monthIndex]; // Get the month name from the array

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate; // Output: "06 Feb 2024"
};

export const FormatAmount = (num) => {
  if (typeof num !== "undefined" && !isNaN(num)) {
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${parts.join(".")}`;
  }
  return num;
};

export function safeParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

export function getTimeDifference(followUpDate) {
  if (!followUpDate) return Infinity; // Return a large value if followUpDate is not available
  // let followUpDate = new Date(followUpDate);
  const [datePart, timePart] = followUpDate.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");

  // Construct the new date string in the ISO 8601 format
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  // console.log(isoDateString);

  const currentDate = new Date();
  // console.log(currentDate);

  const yearCurrent = currentDate.getFullYear();
  const monthCurrent = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const dayCurrent = currentDate.getDate();
  const hourCurrent = currentDate.getHours(); // Corrected method
  const minuteCurrent = currentDate.getMinutes(); // Corrected method
  const secondCurrent = currentDate.getSeconds(); // Corrected method

  // Construct the new date string
  const newDateString = `${yearCurrent}-${monthCurrent
    .toString()
    .padStart(2, "0")}-${dayCurrent.toString().padStart(2, "0")}T${hourCurrent
    .toString()
    .padStart(2, "0")}:${minuteCurrent
    .toString()
    .padStart(2, "0")}:${secondCurrent.toString().padStart(2, "0")}`;

  // console.log(newDateString);
  // Output: 2024-03
  // Format the date
  // const formattedDate = `${(date.getDate() + "").padStart(2, "0")}/${(
  //   date.getMonth() +
  //   1 +
  //   ""
  // ).padStart(2, "0")}/${date.getFullYear()} ${(date.getHours() + "").padStart(
  //   2,
  //   "0"
  // )}:${(date.getMinutes() + "").padStart(2, "0")}:${(
  //   date.getSeconds() + ""
  // ).padStart(2, "0")}`;
  // console.log(formattedDate);
  const followUpTime = new Date(isoDateString).getTime();
  const currentTime = new Date(newDateString).getTime();
  // console.log(currentTime);
  const differenceInMinutes = (followUpTime - currentTime) / (1000 * 60);
  // console.log(differenceInMinutes);

  return differenceInMinutes;
}
