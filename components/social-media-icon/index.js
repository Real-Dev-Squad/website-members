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
      className={classNames.iconContainer}
      target="_blank"
      rel="noreferrer"
      tabIndex="0"
      href={`${IconMapper[type].href}/${[id]}`}>
      <img className={classNames.image} alt={IconMapper[type].alt} src={IconMapper[type].src} />
    </a>
  );
};

SocialMediaIcon.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
};

export default SocialMediaIcon;
