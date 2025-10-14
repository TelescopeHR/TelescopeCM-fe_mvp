export function formatDate(isoDate: any) {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`; //  "1990-02-03"
}

export function ellipsisText(text: string, maxLength: number) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function formatAndCapitalizeString(str: string) {
  if (typeof str !== "string") return "";

  // Replace underscores with spaces
  let result = str.replace(/_/g, " ");

  // Capitalize first letter of each word
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());

  return result;
}

export function containsActive(str: string) {
  if (typeof str !== "string") return false;
  return str.toLowerCase().includes("active");
}

export const getCurrentDate = () => {
  const options = { hour12: true };
  const today = new Date();
  const time = new Date().toLocaleTimeString("en-US", options);
  const date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  const obj = {
    date,
    time,
  };
  return obj;
};

export function formatToYMD(dateString: any) {
  // If it's already in ISO format, split at "T"
  if (typeof dateString === "string" && dateString.includes("T")) {
    return dateString.split("T")[0];
  }

  // If it's a Date object, format it
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function capitalizeFirst(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
