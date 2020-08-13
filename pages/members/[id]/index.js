import React from 'react';
import { useRouter } from 'next/router';
import { getDataURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import Profile from 'components/member-profile';
import NotFound from 'components/not-found-page';
import Layout from 'components/layout';

const MemberProfile = ({ imageLink, data, errorMessage }) => {
  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }
  let { query } = useRouter();
  const { first_name: firstName, last_name: lastName, id: queryId } = query;
  const hasBothNames = firstName && lastName;
  const titleString = hasBothNames ? `${firstName} ${lastName}` : queryId;

  return (
    <Layout title={`${titleString} | Member Real Dev Squad`}>
      <Profile imageLink={imageLink} membersData={data} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const imageLink = getImgURL(params.id);
  const jsonUrl = getDataURL(params.id);

  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error(
        `The user ${params.id} you're trying to find doesn't exist with us, please go to members to see all the available members we have`
      );
    }
    const data = await res.json();

    return { props: { imageLink, data } };
  } catch (e) {
    return { props: { errorMessage: e.message } };
  }
}

MemberProfile.propTypes = {
  imageLink: PropTypes.string,
  data: PropTypes.object,
  errorMessage: PropTypes.string
};

MemberProfile.defaultProps = {
  imageLink: '',
  data: {},
  errorMessage: ''
};

export default React.memo(MemberProfile);
