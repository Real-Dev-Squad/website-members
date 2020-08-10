import { getDataURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import React from 'react';
import Profile from 'components/member-profile';
import NotFound from 'components/404page';

const MemberProfile = ({ imageLink, data, errorMessage }) => {
  if (errorMessage) {
    return <NotFound />;
  }
  return <Profile imageLink={imageLink} membersData={data} />;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const imgLink = getImgURL(params.id);
  const jsonUrl = getDataURL(params.id);

  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error('Invalid Username');
    }
    const returnData = await res.json();

    return { props: { imageLink: imgLink, data: returnData } };
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

export default MemberProfile;
