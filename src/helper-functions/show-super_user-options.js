export const revealSuperUserOption = (setShowOption, isOptionKey) => {
  if (isOptionKey) {
    setShowOption(true);
  }
};

export const hideSuperUserOption = (setShowOption, setIsOptionKey) => {
  setShowOption(false);
  setIsOptionKey(false);
};
