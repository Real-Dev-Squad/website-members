import React from 'react';
import PropTypes from 'prop-types';
import classNames from './status.module.scss';

const StatusModal = ({ name, close }) => {
  console.log('Close:', close);
  return (
    <>
      <div className={classNames.overlay}>
        <div className={classNames.modalWrapper}>
          <h2>{name}</h2>
          <button className={classNames.closedButton} onClick={close}>
            &times;
          </button>
          <div className={classNames.modalBody}>
            <label className={classNames.label} htmlFor="IsMember">
              Member
            </label>
            <select className={classNames.select} name="member" id="member">
              <option value="default">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

StatusModal.propTypes = {
  close: PropTypes.func,
  name: PropTypes.string
};

export default StatusModal;
