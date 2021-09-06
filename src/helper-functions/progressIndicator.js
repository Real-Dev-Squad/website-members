const progressIndicator = (estimatedDaysOfTaskComplete, classNames) => {
  if (estimatedDaysOfTaskComplete === classNames.showTextGreen) {
    return classNames.showProgressGreen;
  }
  if (estimatedDaysOfTaskComplete === classNames.showTextOrange) {
    return classNames.showProgressOrange;
  }
  if (estimatedDaysOfTaskComplete === classNames.showTextRed) {
    return classNames.showProgressRed;
  }
  return classNames.showProgressYellow;
};

export { progressIndicator };
