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
  if (!dateString) return "";

  // If it's already in ISO format with time
  if (typeof dateString === "string" && dateString.includes("T")) {
    return dateString.split("T")[0];
  }

  const d = new Date(dateString);

  // Use the local date parts instead of UTC conversion
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function convertToISO(dateStr: string) {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString();
}

export function formatDateTime(dateString: any) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Get date parts
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Get time parts
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0–23 → 1–12
  const formattedHours = String(hours).padStart(2, "0");

  return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

export function capitalizeFirst(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatToTimeString(input: any) {
  if (!input) {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  // If it's already a Date
  if (input instanceof Date) {
    const hours = input.getHours().toString().padStart(2, "0");
    const minutes = input.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // If it's a string like "17:00:00" or "17:00"
  if (typeof input === "string") {
    const parts = input.split(":");
    if (parts.length >= 2) {
      const [hour, minute] = parts;
      return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }
  }

  // If it's a timestamp
  if (typeof input === "number") {
    const date = new Date(input);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  throw new Error("Invalid input format for formatToTimeString");
}
