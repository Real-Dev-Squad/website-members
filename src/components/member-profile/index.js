/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from '@components/social-media-icon';
import getBadges from '@components/member-profile/mock/get-badges';
import classNames from '@components/member-profile/member-profile.module.scss';
import ContributionType from '@components/member-profile/contribution-type/';
import { motion } from 'framer-motion';
import Modal from '@components/UI/modal';
import ShowSkills from '@components/member-card/show-skills';
import { useForm } from 'react-hook-form';
import { isEmail, isDecimal } from 'validator';

const renderBadgeImages = (badges) =>
  badges.map((badge) => (
    <img
      src={badge.img}
      className={classNames.badge}
      alt={badge.title}
      key={badge.title}
    />
  ));

const CONTRIBUTIONTYPE = ['Noteworthy', 'All'];

const renderContributionsTypes = (
  contributions,
  fullName,
  imageLink,
  devUser,
  tasks
) => {
  const { noteworthy, all } = contributions;
  return CONTRIBUTIONTYPE.map((type, index) => (
    <ContributionType
      type={type}
      key={index}
      contributions={type !== 'All' ? noteworthy : all}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
      tasks={tasks}
    />
  ));
};

const renderSocialMediaIcons = (socialMedia, membersData) =>
  socialMedia.map(
    (ele) =>
      membersData[ele] && (
        <SocialMediaIcon id={membersData[ele]} type={ele} key={ele} />
      )
  );
const Profile = (props) => {
  const {
    membersData: { username, first_name, last_name, company, designation },
    imageLink,
    contributions,
    devUser,
    tasks,
  } = props;
  const { membersData } = props;
  const socialMedia = [
    'twitter_id',
    'github_id',
    'linkedin_id',
    'instagram_id',
  ];

  const fullName = `${first_name} ${last_name}`;
  const memberName = fullName.trim() || '--';
  const rdsUserName = `@${username}`;

  const badges = getBadges(username);

  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const getMembersIntroURL = (RDSID) =>
    `https://api.realdevsquad.com/members/intro/${RDSID}`;
  const parameter = username;

  const onFormSubmit = (data) => {
    const rdsApiURL = getMembersIntroURL(parameter);
    fetch(rdsApiURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 'success') {
          alert('Message Sent.');
          setShowModal(false);
        }
      })
      .catch((error) => {
        alert(`Error!!!\n${error}`);
      })
      .finally(() => {
        if (!window.confirm('Some error occurred!!! \nRETRY?')) {
          setShowModal(false);
        }
      });
  };

  const modalStyle = {
    top: '6%',
    overflowY: 'auto',
    maxHeight: '90vh',
  };

  const children = (
    <div>
      <h1 className={classNames.modalheader}>Send Your Interest</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label className={classNames.tagWord} htmlFor="company">
          Company
          <input
            id="company"
            className={classNames.inputBox}
            type="text"
            placeholder="Eg: Amazon"
            name="company"
            ref={register({
              required: true,
            })}
          />
        </label>
        {errors.company && (
          <p className={classNames.errorPrompt}>Company cannot be blank</p>
        )}
        <label className={classNames.tagWord} htmlFor="first_name">
          First Name
          <input
            id="first_name"
            className={classNames.inputBox}
            type="text"
            placeholder="Eg: John"
            name="first_name"
            ref={register({
              required: true,
            })}
          />
        </label>
        {errors.first_name && (
          <p className={classNames.errorPrompt}>First Name cannot be blank</p>
        )}
        <label className={classNames.tagWord} htmlFor="last_name">
          Last Name
          <input
            id="last_name"
            className={classNames.inputBox}
            type="text"
            placeholder="Eg: Doe"
            name="last_name"
            ref={register({
              required: true,
            })}
          />
        </label>
        {errors.last_name && (
          <p className={classNames.errorPrompt}>Last Name cannot be blank</p>
        )}
        <label className={classNames.tagWord} htmlFor="designation">
          Designation
          <input
            id="designation"
            className={classNames.inputBox}
            type="text"
            placeholder="Eg: HR executive"
            name="designation"
            ref={register({
              required: true,
              minLength: 2,
            })}
          />
        </label>
        {errors.designation?.type === 'required' && (
          <p className={classNames.errorPrompt}>Designation cannot be blank</p>
        )}
        {errors.designation?.type === 'minLength' && (
          <p className={classNames.errorPrompt}>Designation too short</p>
        )}
        <label className={classNames.tagWord} htmlFor="reason">
          Reason
          <input
            id="reason"
            className={classNames.inputBox}
            type="text"
            placeholder="Why you are interested in this candidate(Max 100 characters)"
            name="reason"
            ref={register({
              required: true,
              maxlength: 100,
            })}
          />
        </label>
        {errors.reason && (
          <p className={classNames.errorPrompt}>Reason cannot be blank</p>
        )}
        {errors.reason?.type === 'maxLength' && (
          <p className={classNames.errorPrompt}>Character exceeded</p>
        )}
        <label className={classNames.tagWord} htmlFor="email">
          Email
          <input
            id="email"
            className={classNames.inputBox}
            type="email"
            placeholder="Your Email address"
            name="email"
            ref={register({
              required: true,
              validate: (value) => isEmail(value) === true,
            })}
          />
        </label>
        {errors.email?.type === 'required' && (
          <p className={classNames.errorPrompt}>Email cannot be blank</p>
        )}
        {errors.email?.type === 'validate' && (
          <p className={classNames.errorPrompt}>
            Provide a valid email address
          </p>
        )}
        <label className={classNames.tagWord} htmlFor="currency">
          Currency
          <div className={classNames.select}>
            <select
              id="currency"
              type="select"
              name="currency"
              className={classNames.inputBoxCur}
              ref={register({
                validate: (value) => value !== '',
              })}
            >
              <option value="">--Select--</option>
              <option value="INR">Indian Rupee(INR)</option>
              <option value="USD">United States Dollar(USD)</option>
              <option value="EUR">Euro(EUR)</option>
              <option value="GBP">Great Britain Pound(GBP)</option>
              <option value="AUD">Australian Dollar(AUD)</option>
              <option value="CAD">Canadian Dollar(CAD)</option>
              <option value="SGD">Singapore Dollar(SGD)</option>
              <option value="JPY">Japanese Yen(JPY)</option>
            </select>
            {errors.currency?.type === 'validate' && (
              <p className={classNames.errorPrompt}>Provide a valid currency</p>
            )}
          </div>
        </label>
        <label className={classNames.tagWord} htmlFor="package">
          Annual Package Offered
          <input
            id="package"
            className={classNames.inputBox}
            type="number"
            placeholder="2000000"
            name="package"
            ref={register({
              required: true,
              validate: (value) => isDecimal(value) === true,
            })}
          />
        </label>
        {errors.package && (
          <p className={classNames.errorPrompt}>
            Package offered cannot be blank
          </p>
        )}
        {errors.package?.type === 'validate' && (
          <p className={classNames.errorPrompt}>Package must be a number</p>
        )}
        <button
          color="primary"
          type="submit"
          className={classNames.submitButton}
        >
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div className={classNames.container}>
      {showModal && (
        <Modal
          style={modalStyle}
          show={showModal}
          closeModal={() => setShowModal(false)}
        >
          {children}
        </Modal>
      )}
      <div className={(classNames.sidebar, classNames.column)}>
        <div className={classNames.memberDetails}>
          <motion.img
            layoutId={username}
            src={imageLink}
            className={classNames.profilePic}
            alt="ProfilePicture"
          />
          <div className={classNames.personalInfo}>
            <h1 className={classNames.profileName}>{memberName}</h1>
            <p className={classNames.userName}>{rdsUserName}</p>
            <p className={classNames.workDetails}>
              {designation}
              <br />
              <span className={classNames.userName}>{company}</span>
            </p>
          </div>
          <div className={classNames.iconsContainer}>
            {membersData && (
              <div className={classNames.iconsContainer}>
                {renderSocialMediaIcons(socialMedia, membersData)}
              </div>
            )}
            {devUser && (
              <div>
                <ShowSkills show />
                <div>
                  <button
                    type="button"
                    className={classNames.getIntroButton}
                    onMouseDown={() => setShowModal(true)}
                  >
                    Get Intro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classNames.content}>
        {devUser && (
          <div className={(classNames.section, classNames.card)}>
            <h2>Badges</h2>
            <div className={classNames.badgeContainer}>
              {badges && renderBadgeImages(badges)}
            </div>
          </div>
        )}

        <div className={(classNames.section, classNames.card)}>
          {renderContributionsTypes(
            contributions,
            fullName,
            imageLink,
            devUser,
            tasks
          )}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string,
  membersData: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    designation: PropTypes.string,
  }),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.instanceOf(Array),
    all: PropTypes.instanceOf(Array),
  }),
  devUser: PropTypes.bool,
  tasks: PropTypes.instanceOf(Array),
};

Profile.defaultProps = {
  imageLink: '',
  membersData: {
    username: '',
    first_name: '',
    last_name: '',
    company: '',
    designation: '',
  },
  contributions: {
    noteworthy: [],
    all: [],
  },
  devUser: false,
  tasks: [],
};

export default Profile;
