import React from 'react';
import { useRouter } from 'next/router';

const MemberProfile = () => {
  let { query } = useRouter();
  return <h1>Member Profile - {query.id}</h1>;
};

export default MemberProfile;
