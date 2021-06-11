import React from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import Card from 'components/member-card';
import { container } from '../member-card/card.module.scss';

const PreviewMember = ({ memberDetails }) => {
  const { username, first_name, last_name } = memberDetails;
  return (
    <Link
      prefetch={false}
      href={{
        pathname: '/[id]',
        query: {
          first_name: `${memberDetails ? first_name : ''}`,
          last_name: `${memberDetails ? last_name : ''}`
        }
      }}
      as={`/${username}`}
      key={username}>
      <div className={container}>
        <Card developerInfo={memberDetails} />
      </div>
    </Link>
  );
};

PreviewMember.propTypes = {
  memberDetails: object
};
PreviewMember.defaultProps = {
  memberDetails: {}
};

export default PreviewMember;
