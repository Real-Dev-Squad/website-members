import { SET_ERRORS, SET_MEMBERS } from 'constants/AppConstants';

export const membersReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_MEMBERS:
      return {
        ...state,
        membersArr: payload.membersArr,
        newMembersArr: payload.newMembersArr,
      };
    case SET_ERRORS:
      return {
        ...state,
        errorMsg: payload,
      };
    default:
      return state;
  }
};
