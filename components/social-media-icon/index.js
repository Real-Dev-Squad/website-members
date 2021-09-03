import iconMapper from 'components/social-media-icon/social-media.constant';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'components/social-media-icon/social-media-icon.module.scss';

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
      href={`${iconMapper[type].href}/${[id]}`}
    >
      <img
        className={classNames.iconImage}
        alt={iconMapper[type].alt}
        src={iconMapper[type].src}
      />
    </a>
  );
};

SocialMediaIcon.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

SocialMediaIcon.defaultProps = {
  id: '',
  type: '',
};

export default SocialMediaIcon;
