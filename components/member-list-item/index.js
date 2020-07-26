import { string } from 'prop-types';
import Link from 'next/link';
import { getDataURL, getImgURL } from 'helper-functions/urls';
import classNames from './member-list-item.module.scss';
import { useRef, useEffect } from 'react';
import useFetch from 'custom-hooks/useFetch';

const PreviewMember = (props) => {
  const { rdsId } = props;
  const { data } = useFetch(getDataURL(rdsId));
  const imgRef = useRef();

  const onClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (imgRef && imgRef.current) {
      imgRef.current.style.backgroundImage = `url("${getImgURL(rdsId)}")`;
    }
  }, []);

  return (
    <div className={classNames.container}>
      <Link prefetch={false} href="/members/[id]" as={`/members/${rdsId}`} key={rdsId}>
        <a href={`/members/${rdsId}`}>
          <div ref={imgRef} className={classNames.imgContainer}></div>
        </a>
      </Link>

      <h2 className={classNames.name}>
        {data ? `${data['first_name']} ${data['last_name']}` : rdsId}
      </h2>
      {data && (
        <div className={classNames.iconsContainer}>
          {data['twitter_id'] && (
            <a
              onClick={onClick}
              className={classNames.iconContainer}
              target="_blank"
              rel="noreferrer"
              href={`//twitter.com/${data['twitter_id']}`}>
              <img className={classNames.icon} alt="twitter icon" src="/icons/twitter.png" />
            </a>
          )}
          {data['github_id'] && (
            <a
              onClick={onClick}
              target="_blank"
              rel="noreferrer"
              href={`//github.com/${data['github_id']}`}
              className={classNames.iconContainer}>
              <img className={classNames.icon} alt="github icon" src="/icons/github.png" />
            </a>
          )}
          {data['linkedin_id'] && (
            <a
              onClick={onClick}
              target="_blank"
              rel="noreferrer"
              href={`//linkedin.com/in/${data['linkedin_id']}`}
              className={classNames.iconContainer}>
              <img className={classNames.icon} alt="github icon" src="/icons/linkedin.png" />
            </a>
          )}
          {data['instagram_id'] && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`//instagram.com/${data['instagram_id']}`}
              className={classNames.iconContainer}>
              <img className={classNames.icon} alt="github icon" src="/icons/instagram.png" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

PreviewMember.propTypes = {
  rdsId: string
};

export default PreviewMember;
