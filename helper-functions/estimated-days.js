function estimatedDays(percentageOfDaysRemaining, percentOfTaskLeft, classNames) {
  if (percentageOfDaysRemaining >= percentOfTaskLeft) {
    return classNames.showTextGreen;
  } else if (percentageOfDaysRemaining < 50 && percentOfTaskLeft > 75) {
    return classNames.showTextOrange;
  } else if (percentageOfDaysRemaining < 25 && percentOfTaskLeft > 35) {
    return classNames.showTextRed;
  } else {
    return classNames.showTextYellow;
  }
}

export { estimatedDays };
