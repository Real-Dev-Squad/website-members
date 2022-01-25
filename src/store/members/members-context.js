/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { membersReducer } from './members-reducer';

const MembersContext = createContext({});
const initialState = {
  members: [],
  newMembers: [],
  errorMsg: '',
};

export const MembersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(membersReducer, initialState);
  return (
    <MembersContext.Provider value={{ state, dispatch }}>
      {children}
    </MembersContext.Provider>
  );
};

export const membersContext = () => {
  const context = useContext(MembersContext); // this needs to be changed
  if (!context)
    throw new Error(`members context can only  
        be used in a component wrapped with MembersContext`);
  return context;
};

MembersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
