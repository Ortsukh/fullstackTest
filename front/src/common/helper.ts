import dayjs from "dayjs";

export const getUserAge = (dateOfBirth: string) => {
  const date1 = dayjs(dateOfBirth);
  const date2 = dayjs();
  return date2.diff(date1, "year");
};
