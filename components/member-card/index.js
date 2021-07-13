import React, { useState } from 'react';
import classNames from './card.module.scss';
import { motion } from 'framer-motion';
import SocialMediaIcon from '../social-media-icon';
import PropTypes from 'prop-types';
import StatusModal from '../modal/Status';

const Card = ({ developerInfo }) => {
  const { username, first_name, last_name, img_url, isMember } = developerInfo;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];
  const fullName = `${first_name + ' ' + last_name}`;

  const [showModal, setShowModal] = useState(false);

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  const showModalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <motion.img
        layoutId={username}
        src={img_url + `?${Math.random() * 100}`}
        onError={brokenImageHandler}
        className={isMember ? classNames.imgContainer : classNames.imgContainerNewMember}
        alt={username}
      />
      <h2 className={isMember ? classNames.nameOfPerson : classNames.nameOfPersonForNewMember}>
        {fullName.length > 1 && last_name !== undefined
          ? fullName.length > 20
            ? first_name
            : fullName
          : username}
      </h2>
      {isMember && (
        <div className={classNames.iconsContainer}>
          {socialMedia.map(
            (ele) =>
              developerInfo[ele] && (
                <React.Fragment key={ele}>
                  <SocialMediaIcon id={developerInfo[ele]} type={ele} />
                </React.Fragment>
              )
          )}
        </div>
      )}
      <button
        className={classNames.statusIcon}
        aria-label="Settings Icon"
        title="Show Modal"
        onClick={(e) => {
          e.stopPropagation();
          showModalHandler();
        }}>
        <span role="img" aria-label="gear">
          ⚙️
        </span>
      </button>

      {showModal ? <StatusModal name={username} close={showModalHandler}></StatusModal> : null}
    </>
  );
};

Card.propTypes = {
  developerInfo:
    PropTypes.object.isRequired &&
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      img_url: PropTypes.string.isRequired,
      isMember: PropTypes.bool.isRequired
    })
};

export default Card;
