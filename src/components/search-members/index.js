import React from 'react';
import classNames from './search-members.module.scss';

export default function SearchMemberBox({ handleChange }) {
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
}
