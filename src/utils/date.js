export const DAY_LABELS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export const padNumber = (number) => String(number).padStart(2, "0");

export const createToday = () => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return today;
};

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return `${year}-${month}-${day}`;
};

export const formatDotDate = (date) =>
  [date.getFullYear(), padNumber(date.getMonth() + 1), padNumber(date.getDate())]
    .join(".");

export const formatMonthDay = (date) =>
  `${padNumber(date.getMonth() + 1)}.${padNumber(date.getDate())}`;

export const formatDateRange = (dates) => {
  if (dates.length === 0) {
    return "";
  }

  return `${formatDotDate(dates[0])} - ${formatDotDate(dates[dates.length - 1])}`;
};

export const parseDateKey = (dateKey) => {
  const [year, month, day] = String(dateKey ?? "").split("-").map(Number);

  return new Date(year, month - 1, day, 12);
};

export const addDays = (date, amount) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
};

export const getMonday = (date) => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDay();
  const difference = currentDay === 0 ? -6 : 1 - currentDay;

  currentDate.setDate(currentDate.getDate() + difference);
  currentDate.setHours(12, 0, 0, 0);
  return currentDate;
};

export const getMonthRange = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const fromDate = `${year}-${padNumber(month + 1)}-01`;
  const lastDay = new Date(year, month + 1, 0);
  const toDate = formatDateKey(lastDay);

  return { fromDate, toDate };
};
