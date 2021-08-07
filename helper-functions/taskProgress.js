import { timeWas } from 'helper-functions/time-was';

function percentageofDaysRemaining(startedOn, endsOn, completedDate) {
  const startDate = timeWas(startedOn * 1000, true, endsOn * 1000);
  const endDate = timeWas(endsOn * 1000, true, startDate * 1000);
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  completedDate = completedDate.split(' ');
  return (completedDate[0] / diffDays) * 100;
}

export { percentageofDaysRemaining };
