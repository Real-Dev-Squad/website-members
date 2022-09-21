export const revealSuperUserOption = (setShowOption, isOptionKey) => {
  if (isOptionKey) {
    setShowOption(true);
  }
};

export const hideSuperUserOption = (setShowOption) => {
  setShowOption(false);
};
