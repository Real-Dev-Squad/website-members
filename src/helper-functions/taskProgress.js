import { timeWas } from '@helper-functions/time-was';

const percentageofDaysRemaining = (
  startedOn,
  endsOn,
  completedDate,
  devUser
) => {
  const startDate = timeWas(startedOn * 1000, true, endsOn * 1000, devUser);
  const endDate = timeWas(endsOn * 1000, true, startDate * 1000, devUser);
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const completedDateArr = completedDate.split(' ');

  return (completedDateArr[0] / diffDays) * 100;
};

export { percentageofDaysRemaining };
