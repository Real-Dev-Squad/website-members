import { createContext, useContext, useReducer } from 'react';
import { membersReducer } from './members-reducer';
import PropTypes from 'prop-types';

const MembersContext = createContext({});
const initialState = {
  membersArr: [],
  newMembersArr: [],
  errorMsg: ''
};

export const MembersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(membersReducer, initialState);
  return <MembersContext.Provider value={{ state, dispatch }}>{children}</MembersContext.Provider>;
};

export const membersContext = () => {
  const context = useContext(MembersContext);
  if (!context)
    throw new Error(`membersContext context can only  
        be used in a component wrapped with MembersContext`);
  return context;
};

MembersProvider.propTypes = {
  children: PropTypes.node
};
