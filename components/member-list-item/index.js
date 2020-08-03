import { getDataURL, getImgURL } from 'helper-functions/urls';
import { useEffect, useRef } from 'react';

import Link from 'next/link';
import SocialMediaIcon from '../social-media-icon';
import classNames from './member-list-item.module.scss';
import { string } from 'prop-types';
import useFetch from 'custom-hooks/useFetch';

const PreviewMember = (props) => {
  const { rdsId } = props;
  const { data } = useFetch(getDataURL(rdsId));
  const imgRef = useRef();

  useEffect(() => {
    if (imgRef && imgRef.current) {
      imgRef.current.style.backgroundImage = `url("${getImgURL(rdsId)}")`;
    }
  }, []);

  return (
    <Link prefetch={false} href="/members/[id]" as={`/members/${rdsId}`} key={rdsId}>
      <div className={classNames.container}>
        <div>
          <div ref={imgRef} className={classNames.imgContainer}></div>
        </div>

        <h2 className={classNames.nameOfPerson}>
          {data ? `${data['first_name']} ${data['last_name']}` : rdsId}
        </h2>
        {data && (
          <div className={classNames.iconsContainer}>
            {data['twitter_id'] && <SocialMediaIcon id={data.twitter_id} type="twitter" />}
            {data['github_id'] && <SocialMediaIcon id={data.github_id} type="github" />}
            {data['linkedin_id'] && <SocialMediaIcon id={data.linkedin_id} type="linkedIn" />}
            {data['instagram_id'] && <SocialMediaIcon id={data.instagram_id} type="instagram" />}
          </div>
        )}
      </div>
    </Link>
  );
};

PreviewMember.propTypes = {
  rdsId: string
};

export default PreviewMember;
