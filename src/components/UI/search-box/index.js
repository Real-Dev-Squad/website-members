import React from 'react';
import { searchMemberContext } from '@store/searchbox/searchMember-context';
import classNames from './search-box.module.scss';

const SearchBox = () => {
  const { setSearchTerm } = searchMemberContext();
  return (
    <div className={classNames.searchContainer}>
      <input
        type="text"
        placeholder="&#128269; search members here"
        onChange={({ target: { value } }) => setSearchTerm(value)}
        className={classNames.searchBox}
      />
    </div>
  );
};

export default SearchBox;
