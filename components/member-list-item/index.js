import React from 'react';
import Link from 'next/link';
import SocialMediaIcon from '../social-media-icon';
import classNames from './member-list-item.module.scss';
import { object } from 'prop-types';
import { motion } from 'framer-motion';

const PreviewMember = ({ memberDetails }) => {
  const { username } = memberDetails;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];
  const fullName = `${memberDetails.first_name + ' ' + memberDetails.last_name}`;

  const brokenImageHandler = (e) => {
    e.target.src = '/images/Avatar.png';
  };

  return (
    <Link
      prefetch={false}
      href={{
        pathname: '/[id]',
        query: {
          first_name: `${memberDetails ? memberDetails.first_name : ''}`,
          last_name: `${memberDetails ? memberDetails.last_name : ''}`
        }
      }}
      as={`/${username}`}
      key={username}>
      <div className={classNames.container}>
        <motion.img
          layoutId={username}
          src={memberDetails.img_url + `?${Math.random() * 100}`}
          onError={brokenImageHandler}
          className={classNames.imgContainer}
          alt={username}
        />
        <h2 className={classNames.nameOfPerson}>
          {fullName.length > 1
            ? `${memberDetails['first_name']} ${memberDetails['last_name']}`
            : username}
        </h2>
        {memberDetails && (
          <div className={classNames.iconsContainer}>
            {socialMedia.map(
              (ele) =>
                memberDetails[ele] && (
                  <React.Fragment key={ele}>
                    <SocialMediaIcon id={memberDetails[ele]} type={ele} />
                  </React.Fragment>
                )
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

PreviewMember.propTypes = {
  memberDetails: object
};

export default PreviewMember;
