import React from 'react';
import { useRouter } from 'next/router';
import Profile from 'components/member-profile';
import Layout from 'components/layout';
const MemberProfile = () => {
  let { query } = useRouter();
  return (
    <Layout title={`${query.id} | Member Real Dev Squad`}>
      <Profile id={query.id} />
    </Layout>
  );
};

export default MemberProfile;
