import React, { useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from '@components/member-card';
import { useRouter } from 'next/router';
import { TIMEOUT } from '@constants/AppConstants';

import styles from '@components/preview-container/preview-member/preview-member.module.scss';

const PreviewMember = ({ memberDetails, optionKey }) => {
  const { username, first_name, last_name } = memberDetails;
  const divref = useRef(null);
  const cardRef = useRef(null);
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;

  let timer = 0;

  const mouseEnter = () => {
    if (!optionKey) {
      timer = setTimeout(() => {
        divref.current.style.display = 'flex';
        divref.current.style.height = `${cardRef.current.offsetHeight}px`;
        divref.current.style.width = `${cardRef.current.offsetWidth}px`;
      }, TIMEOUT);
    }
  };

  const mouseLeave = () => {
    if (!optionKey) {
      divref.current.style.display = 'none';
      clearTimeout(timer);
    }
  };
  return (
    <Link
      prefetch={false}
      href={{
        pathname: '/[id]',
        query: {
          first_name: `${memberDetails ? first_name : ''}`,
          last_name: `${memberDetails ? last_name : ''}`,
        },
      }}
      as={`/${username}`}
      key={username}
    >
      <div
        ref={cardRef}
        className={styles.container}
        onMouseEnter={dev && mouseEnter}
        onMouseLeave={dev && mouseLeave}
      >
        <Card developerInfo={memberDetails} optionKey={optionKey} />
        {dev && !optionKey && (
          <div ref={divref} className={styles.previewMember}>
            <div style={{ margin: '0.5rem' }}>
              <p style={{ fontWeight: '900' }}>Company: </p>
              <p>{memberDetails?.company || 'NA'}</p>
            </div>
            <div style={{ margin: '0.5rem' }}>
              <p style={{ fontWeight: '900' }}>Designation: </p>
              <p>{memberDetails?.deesignation || 'NA'}</p>
            </div>
            <div style={{ margin: '0.5rem' }}>
              <p style={{ fontWeight: '900' }}>Years Of Experience: </p>
              <p>
                {memberDetails?.yoe !== undefined || memberDetails.yoe === 0
                  ? 'Just Starting Out'
                  : memberDetails.yoe}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

PreviewMember.propTypes = {
  memberDetails: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
PreviewMember.defaultProps = {
  memberDetails: {},
};

export default PreviewMember;
