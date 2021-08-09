import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'components/search-members/search-members.module.scss';

export default function SearchMembers({ handleChange }) {
  return (
    <div className={classNames.searchContainer}>
      <input
        type="text"
        placeholder="&#128269; search members"
        onChange={handleChange}
        className={classNames.searchBox}
      />
    </div>
  );
}

SearchMembers.propTypes = {
  handleChange: PropTypes.func
};
