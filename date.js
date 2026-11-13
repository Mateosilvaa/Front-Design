export const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export function getCalendarInfo(now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth();
  return {
    year,
    month,
    today: now.getDate(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    startOffset: new Date(year, month, 1).getDay(),
  };
}

export const getDayOfWeek = (year, month, day) =>
  new Date(year, month, day).getDay();
