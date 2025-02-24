/**
 * Formats a phone number into E.164 international format (+15556667777).
 * @param phoneNumber - The input phone number in any format.
 * @param defaultCountryCode - The default country code (e.g., '1' for the US).
 * @returns The formatted phone number in E.164 format, or null if invalid.
 */
export function formatPhoneNumber(phoneNumber: string, defaultCountryCode: string = '1'): string | null {
  if (!phoneNumber) return null;

  // Remove all non-numeric characters except '+'
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');

  // If the number already starts with '+', assume it's valid
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  // If the number already starts with a country code (e.g., '1' for US)
  if (cleaned.startsWith(defaultCountryCode) && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  // Remove leading zeros or other invalid characters
  const digitsOnly = cleaned.replace(/^0+/, '');

  // Prepend the default country code (assumes US by default)
  const formatted = `+${defaultCountryCode}${digitsOnly}`;

  // Validate length for typical international phone numbers (10-15 digits)
  if (formatted.length >= 11 && formatted.length <= 15) {
    return formatted;
  }

  return null; // Invalid phone number
}


