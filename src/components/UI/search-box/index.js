import React from 'react';
import { searchMemberContext } from '@store/search-members/searchMembers-context';
import { SEARCHBOX_PLACEHOLDER } from '@constants/AppConstants';
import classNames from './search-box.module.scss';

const SearchBox = () => {
  const { setSearchTerm } = searchMemberContext();
  return (
    <div className={classNames.searchContainer}>
      <input
        type="text"
        placeholder={SEARCHBOX_PLACEHOLDER}
        onChange={({ target: { value } }) => setSearchTerm(value)}
        className={classNames.searchBox}
      />
    </div>
  );
};

export default SearchBox;
