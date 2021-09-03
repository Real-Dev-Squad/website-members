function estimatedDays(
  percentageOfDaysRemaining,
  percentOfTaskLeft,
  classNames
) {
  if (percentageOfDaysRemaining >= percentOfTaskLeft) {
    return classNames.showTextGreen;
  }
  if (percentageOfDaysRemaining < 50 && percentOfTaskLeft > 75) {
    return classNames.showTextOrange;
  }
  if (percentageOfDaysRemaining < 25 && percentOfTaskLeft > 35) {
    return classNames.showTextRed;
  }
  return classNames.showTextYellow;
}

export { estimatedDays };
