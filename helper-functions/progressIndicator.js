function progressIndicator(estimatedDaysOfTaskComplete, classNames) {
  if (estimatedDaysOfTaskComplete === classNames.showTextGreen) {
    return classNames.showProgressGreen;
  } else if (estimatedDaysOfTaskComplete === classNames.showTextOrange) {
    return classNames.showProgressOrange;
  } else if (estimatedDaysOfTaskComplete === classNames.showTextRed) {
    return classNames.showProgressRed;
  } else {
    classNames.showProgressYellow;
  }
}

export { progressIndicator };
