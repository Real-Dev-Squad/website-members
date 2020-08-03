import React from 'react';
import { useRouter } from 'next/router';
import Profile from 'components/member-profile';
import Layout from 'components/layout';
const MemberProfile = () => {
  let { query } = useRouter();
  const { first_name, last_name } = query;

  return (
    <Layout
      title={`${
        query.first_name && query.last_name ? `${first_name} ${last_name}` : query.id
      } | Member Real Dev Squad`}>
      <Profile id={query.id} />
    </Layout>
  );
};

export default React.memo(MemberProfile);
