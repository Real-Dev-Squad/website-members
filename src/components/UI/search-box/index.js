import React from 'react';
import classNames from '@components/UI/search-box/search-box.module.scss';
import { searchMemberContext } from '@store/search-members/searchMembers-context';

const SearchBox = () => {
  const { setSearchTerm } = searchMemberContext();

  return (
    <div className={classNames.searchbox_container}>
      <input
        className={classNames.searchbox}
        type="text"
        placeholder="Search by Skills, Accomplishments levels, Name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className={classNames.button}
        // onClick={() => searchFunction(searchTerm)}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBox;
