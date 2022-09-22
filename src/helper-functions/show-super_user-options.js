export const showSuperUserOption = (setShowOption, isOptionKey) => {
  if (isOptionKey) {
    setShowOption(true);
  }
};

export const hideSuperUserOption = (setShowOption) => {
  setShowOption(false);
};
