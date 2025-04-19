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

  // Split the CSV into lines first
  const lines = csv.split('\n');
  
  // Process each line to handle quoted values correctly
  const processedLines = lines.map(line => {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;
    let originalQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          // Handle escaped quotes
          currentValue += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
          if (currentValue === '') {
            originalQuotes = true;
          }
        }
      } else if (char === ',' && !insideQuotes) {
        // End of field
        if (originalQuotes || currentValue.includes(',')) {
          values.push(`"${currentValue}"`);
        } else {
          values.push(currentValue);
        }
        currentValue = '';
        originalQuotes = false;
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    if (originalQuotes || currentValue.includes(',')) {
      values.push(`"${currentValue}"`);
    } else {
      values.push(currentValue);
    }
    
    return values.join(', ');
  });

  // Map each line to include its line number (1-based index)
  const topLinesWithNumbers = processedLines
    .slice(0, numOfLines)
    .map((line, index) => `${index + 1}: ${line}`);

  return topLinesWithNumbers.join('\n');
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
