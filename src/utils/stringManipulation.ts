export function getFileNameFromUrl(url: string): string {
  try {
    // Create a new URL object
    const parsedUrl = new URL(url);

    // Extract the pathname
    const pathname = parsedUrl.pathname;

    // Get the file name from the pathname
    const fileName = pathname.split("/").pop();

    // Decode any URL-encoded characters
    return fileName ? decodeURIComponent(fileName) : "";
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
}


export function makeUrlCompatible(fileName: string): string {
  if (!fileName) return "";

  // Trim whitespace from both ends of the string
  let cleanedFileName = fileName.trim();

  let suffix = fileName.split(".").pop();

  cleanedFileName = suffix ? fileName.slice(0, -suffix.length - 1) : fileName;

  // Replace spaces with hyphens
  cleanedFileName = cleanedFileName.replace(/\s+/g, "-");

  // Remove special characters except for hyphens and underscores
  cleanedFileName = cleanedFileName.replace(/[^a-zA-Z0-9-_]/g, "");

  // Add the file extension back
  cleanedFileName = suffix ? `${cleanedFileName}.${suffix}` : cleanedFileName;

  // Encode the file name to ensure it is URL compatible
  return encodeURIComponent(cleanedFileName);
}

export function getTopOfCsv(csv: string, numOfLines: number): string {
  if (!csv) return "";

  // This regex matches newlines outside of double quotes
  const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;

  // Using an array to collect lines
  let match;
  const lines = [];
  let currentLine = [];

  while ((match = regex.exec(csv)) !== null) {
    let matchedValue = match[0];
    if (matchedValue.match(/\n/)) {
      // If we encounter a newline, push the current line to lines array and reset it
      lines.push(currentLine.join(", "));
      currentLine = [];
    } else {
      // Remove leading commas for fields except the first
      if (matchedValue.startsWith(",")) {
        matchedValue = matchedValue.substring(1);
      }
      currentLine.push(matchedValue);
    }
  }

  // Don't forget to push the last line if it wasn't empty
  if (currentLine.length > 0) {
    lines.push(currentLine.join(""));
  }

  // Map each line to include its line number (1-based index)
  const topLinesWithNumbers = lines
    .slice(0, numOfLines)
    .map((line, index) => `${index + 1}: ${line}`);

  return topLinesWithNumbers.join("\n");
}

export function escapeCsvValue(value: string | number): string {
  if (typeof value === 'number') return value.toString();
  // Escape quotes and wrap in quotes if contains special characters
  const escaped = value.replace(/"/g, '""');
  if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
    return `"${escaped}"`;
  }
  return escaped;
}

export function convertYNToBoolean(value: string): boolean | null {
  return value === "Y" ? true : value === "N" ? false : null;
}

export function emptyStringToNull(value: string): string | null {
  return value === "" ? null : value;
}
