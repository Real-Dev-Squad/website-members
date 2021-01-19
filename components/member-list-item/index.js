import React from 'react';
import Link from 'next/link';
import SocialMediaIcon from '../social-media-icon';
import classNames from './member-list-item.module.scss';
import { object } from 'prop-types';
import { motion } from 'framer-motion';

const PreviewMember = ({ memberDetails }) => {
  const { id } = memberDetails;
  const socialMedia = ['twitter_id', 'github_id', 'linkedin_id', 'instagram_id'];

  return (
    <div className={classNames.container}>
      <Link
        prefetch={false}
        href={{
          pathname: '/[id]',
          query: {
            first_name: `${memberDetails ? memberDetails.first_name : ''}`,
            last_name: `${memberDetails ? memberDetails.last_name : ''}`
          }
        }}
        as={`/${id}`}
        key={id}>
        <a href={`/${id}`}>
          <motion.img
            layoutId={id}
            src={memberDetails.img_url}
            className={classNames.imgContainer}
            alt={id}
          />
        </a>
      </Link>

      <h2 className={classNames.nameOfPerson}>
        {memberDetails ? `${memberDetails['first_name']} ${memberDetails['last_name']}` : id}
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
  );
};

PreviewMember.propTypes = {
  memberDetails: object
};

export default PreviewMember;
