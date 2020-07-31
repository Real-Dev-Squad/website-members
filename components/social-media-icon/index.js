import { IconMapper } from './social-media.constant';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from './social-media-icon.module.scss';

const SocialMediaIcon = (props) => {
  const { id, type } = props;

  const onClick = (e) => {
    e.stopPropagation();
  };

  return (
    <a
      onClick={onClick}
      className={classNames.iconAnchor}
      target="_blank"
      rel="noreferrer"
      tabIndex="0"
      href={`${IconMapper[type].href}/${[id]}`}>
      <img className={classNames.iconImage} alt={IconMapper[type].alt} src={IconMapper[type].src} />
    </a>
  );
};

SocialMediaIcon.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
};

SocialMediaIcon.defaultProps = {
  id: '',
  type: ''
};

export default SocialMediaIcon;
