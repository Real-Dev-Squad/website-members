import React from 'react';
import classNames from './search-box.module.scss';

const SearchBox = ({ handleChange }) => {
  return (
    <div className={classNames.searchContainer}>
      <input
        type="text"
        placeholder="&#128269; search members here"
        onChange={handleChange}
        className={classNames.searchBox}
      />
    </div>
  );
};

export default SearchBox;
