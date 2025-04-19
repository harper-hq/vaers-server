import {
  getFileNameFromUrl,
  makeUrlCompatible,
  getTopOfCsv,
  escapeCsvValue,
  convertYNToBoolean,
  emptyStringToNull
} from '../stringManipulation';

describe('String Manipulation Utilities', () => {
  describe('getFileNameFromUrl', () => {
    it('should extract filename from a valid URL', () => {
      const url = 'https://example.com/path/to/file.txt';
      expect(getFileNameFromUrl(url)).toBe('file.txt');
    });

    it('should handle URL-encoded characters', () => {
      const url = 'https://example.com/path/to/my%20file.txt';
      expect(getFileNameFromUrl(url)).toBe('my file.txt');
    });

    it('should return empty string for invalid URL', () => {
      const url = 'not-a-url';
      expect(getFileNameFromUrl(url)).toBe('');
    });
  });

  describe('makeUrlCompatible', () => {
    it('should convert spaces to hyphens', () => {
      expect(makeUrlCompatible('my file.txt')).toBe('my-file.txt');
    });

    it('should remove special characters', () => {
      expect(makeUrlCompatible('my@file#name.txt')).toBe('myfilename.txt');
    });

    it('should handle empty string', () => {
      expect(makeUrlCompatible('')).toBe('');
    });

    it('should preserve file extension', () => {
      expect(makeUrlCompatible('my file name.txt')).toBe('my-file-name.txt');
    });
  });

  describe('getTopOfCsv', () => {
    it('should return first N lines with line numbers', () => {
      const csv = 'header1,header2\nvalue1,value2\nvalue3,value4';
      const expected = '1: header1, header2\n2: value1, value2';
      expect(getTopOfCsv(csv, 2)).toBe(expected);
    });

    it('should handle empty input', () => {
      expect(getTopOfCsv('', 5)).toBe('');
    });

    it('should handle quoted values with commas', () => {
      const csv = 'header1,header2\n"value1,with,commas",value2';
      const expected = '1: header1, header2\n2: "value1,with,commas", value2';
      expect(getTopOfCsv(csv, 2)).toBe(expected);
    });
  });

  describe('escapeCsvValue', () => {
    it('should handle simple string', () => {
      expect(escapeCsvValue('simple')).toBe('simple');
    });

    it('should handle string with commas', () => {
      expect(escapeCsvValue('value,with,commas')).toBe('"value,with,commas"');
    });

    it('should handle string with quotes', () => {
      expect(escapeCsvValue('value"with"quotes')).toBe('"value""with""quotes"');
    });

    it('should handle numbers', () => {
      expect(escapeCsvValue(123)).toBe('123');
    });
  });

  describe('convertYNToBoolean', () => {
    it('should convert Y to true', () => {
      expect(convertYNToBoolean('Y')).toBe(true);
    });

    it('should convert N to false', () => {
      expect(convertYNToBoolean('N')).toBe(false);
    });

    it('should convert other values to null', () => {
      expect(convertYNToBoolean('other')).toBe(null);
    });
  });

  describe('emptyStringToNull', () => {
    it('should convert empty string to null', () => {
      expect(emptyStringToNull('')).toBe(null);
    });

    it('should preserve non-empty string', () => {
      expect(emptyStringToNull('value')).toBe('value');
    });
  });
});