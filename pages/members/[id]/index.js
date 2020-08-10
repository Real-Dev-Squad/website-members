import { getDataURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import React from 'react';
import Profile from 'components/member-profile';

const MemberProfile = ({ imageLink, data }) => {
  return <Profile imageLink={imageLink} membersData={data} />;
};

export async function getServerSideProps(context) {
  const imgLink = getImgURL(context.params.id);
  const jsonUrl = getDataURL(context.params.id);
  const res = await fetch(jsonUrl);
  const returnData = await res.json();

  return { props: { imageLink: imgLink, data: returnData } };
}

MemberProfile.propTypes = {
  imageLink: PropTypes.string
};

MemberProfile.propTypes = {
  data: PropTypes.object
};

export default MemberProfile;
