import React, { useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from '@components/member-card';
import {
  container,
  descriptionDivStyle,
  pstyle,
} from '@components/member-card/card.module.scss';
import { useRouter } from 'next/router';
import { TIMEOUT } from '@constants/AppConstants';

const PreviewMember = ({ memberDetails }) => {
  const { username, first_name, last_name } = memberDetails;
  const divref = useRef(null);
  const cardRef = useRef(null);
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;

  let timer = 0;
  console.log(TIMEOUT);

  const mouseEnter = () => {
    timer = setTimeout(() => {
      console.log('in');
      divref.current.style.display = 'flex';
      divref.current.style.height = `${cardRef.current.offsetHeight}px`;
      divref.current.style.width = `${cardRef.current.offsetWidth}px`;
    }, TIMEOUT);
  };

  const mouseLeave = () => {
    console.log('out');
    divref.current.style.display = 'none';
    clearTimeout(timer);
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
        className={container}
        onMouseEnter={dev && mouseEnter}
        onMouseLeave={dev && mouseLeave}
      >
        <Card developerInfo={memberDetails} />
        {dev && (
          <div ref={divref} className={descriptionDivStyle}>
            <p className={pstyle}>Company: {memberDetails?.company || 'NA'}</p>
            <p className={pstyle}>
              Designation: {memberDetails?.deesignation || 'NA'}
            </p>
            <p className={pstyle}>
              Years Of Experience:{' '}
              {memberDetails?.yoe || memberDetails.yoe === 0
                ? 'Just Starting Out'
                : memberDetails.yoe}
            </p>
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
