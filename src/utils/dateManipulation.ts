export function dateStringToTimestamp(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime();
}

export const formatDate = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
};
