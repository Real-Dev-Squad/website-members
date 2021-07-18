
import React, { useState } from 'react';
import classNames from './card.module.scss';
import { motion } from 'framer-motion';
import SocialMediaIcon from 'components/social-media-icon';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import Header from '../modal/Modal/Header';
import Footer from '../modal/Modal/Footer';

const Card = ({ developerInfo }) => {
  const { username, first_name, last_name, img_url, isMember } = developerInfo;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];
  const fullName = `${first_name + ' ' + last_name}`;

  const [showModal, setShowModal] = useState(false);

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  const showModalHandler = (e) => {
    e.preventDefault();
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <div>
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
          onClick={showModalHandler}>
          <span role="img" aria-label="Settings Icon">
            ⚙️
          </span>
        </button>
      </div>

      {showModal ? (
        <Modal show={showModal} hide={showModalHandler} color="" name={username}>
          <Header hide={showModalHandler}>{username}</Header>
          <div onClick={(e) => e.stopPropagation()} aria-hidden="true">
            <label htmlFor="member" id="label">
              Member:
            </label>
            <select className={classNames.select} name="member" id="member">
              <option value="default">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <Footer>Status Modal</Footer>
        </Modal>
      ) : null}
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
