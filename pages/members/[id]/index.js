import React from 'react';
import { useRouter } from 'next/router';
import Profile from 'components/member-profile';

const MemberProfile = () => {
  let { query } = useRouter();
  return <Profile id={query.id} />;
};

export default MemberProfile;
