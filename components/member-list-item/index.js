import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SocialMediaIcon from '../social-media-icon';
import classNames from './member-list-item.module.scss';
import { object } from 'prop-types';

const PreviewMember = ({ memberDetails }) => {
  const { id } = memberDetails;

  const imgRef = useRef();

  useEffect(() => {
    if (imgRef && imgRef.current) {
      imgRef.current.style.backgroundImage = `url("${memberDetails.img_url}")`;
    }
  }, []);

  return (
    <div className={classNames.container}>
      <Link
        prefetch={false}
        href={{
          pathname: '/members/[id]',
          query: {
            first_name: `${memberDetails ? memberDetails.first_name : ''}`,
            last_name: `${memberDetails ? memberDetails.last_name : ''}`
          }
        }}
        as={`/members/${id}`}
        key={id}>
        <a href={`/members/${id}`}>
          <div ref={imgRef} className={classNames.imgContainer}></div>
        </a>
      </Link>

      <h2 className={classNames.nameOfPerson}>
        {memberDetails ? `${memberDetails['first_name']} ${memberDetails['last_name']}` : id}
      </h2>
      {memberDetails && (
        <div className={classNames.iconsContainer}>
          {memberDetails['twitter_id'] && (
            <SocialMediaIcon id={memberDetails.twitter_id} type="twitter" />
          )}
          {memberDetails['github_id'] && (
            <SocialMediaIcon id={memberDetails.github_id} type="github" />
          )}
          {memberDetails['linkedin_id'] && (
            <SocialMediaIcon id={memberDetails.linkedin_id} type="linkedIn" />
          )}
          {memberDetails['instagram_id'] && (
            <SocialMediaIcon id={memberDetails.instagram_id} type="instagram" />
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
