import iconMapper from '@components/social-media-icon/social-media.constant';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from '@components/social-media-icon/social-media-icon.module.scss';

const SocialMediaIcon = (props) => {
  const { id, type } = props;

  let socialUserId = id;
  if (socialUserId) {
    if (
      socialUserId.includes('linkedin') &&
      (socialUserId.includes('https') || socialUserId.includes('http'))
    ) {
      socialUserId = socialUserId.split('/').at(-2);
    } else if (
      socialUserId.includes('https') ||
      socialUserId.includes('http')
    ) {
      socialUserId = socialUserId.split('/').pop();
    } else {
      socialUserId = id;
    }
  }

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
      href={`${iconMapper[type].href}/${[socialUserId]}`}
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
