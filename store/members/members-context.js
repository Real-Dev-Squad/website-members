import { membersReducer } from './members-reducer';
import PropTypes from 'prop-types';
const { createContext, useReducer, default: React, useContext } = require('react');

const MembersContext = createContext({});
const initialState = {
  membersArr: [],
  newMembersArr: [],
  errorMsg: ''
};

export const MembersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(membersReducer, initialState);
  return (
    <MembersContext.Provider value={{ membersState: state, membersDispatch: dispatch }}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = () => useContext(MembersContext);

MembersProvider.propTypes = {
  children: PropTypes.node
};
