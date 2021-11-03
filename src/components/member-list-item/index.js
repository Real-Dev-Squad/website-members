import React, { useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from '@components/member-card';
import { container } from '@components/member-card/card.module.scss';
import { useRouter } from 'next/router';

const PreviewMember = ({ memberDetails }) => {
  const { username, first_name, last_name } = memberDetails;
  const divref = useRef(null);
  const cardRef = useRef(null);
  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const descriptionDivStyle = {
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    position: 'absolute',
    display: 'none',
    color: 'white',
    flex: '1 250px',
    flexDirection: 'column',
    border: 'none',
    borderRadius: '5%',
    marginTop: '-1.3rem',
    marginLeft: '-0.65rem',
    padding: '2rem',
  };

  const pstyle = {
    margin: '0.5rem',
  };

  let timer = 0;
  const TIMEOUT = 3000;

  function mouseEnter() {
    timer = setTimeout(() => {
      divref.current.style.display = 'flex';
      divref.current.style.height = `${cardRef.current.offsetHeight}px`;
      divref.current.style.width = `${cardRef.current.offsetWidth}px`;
    }, TIMEOUT);
  }

  function mouseLeave() {
    divref.current.style.display = 'none';
    clearTimeout(timer);
  }
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
          <div ref={divref} style={descriptionDivStyle}>
            <p style={pstyle}>Company: {memberDetails?.company || 'nil'}</p>
            <p style={pstyle}>
              Designation: {memberDetails?.deesignation || 'nil'}
            </p>
            <p style={pstyle}>
              Years Of Experience: {memberDetails?.yoe || 'Not Experienced'}
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
