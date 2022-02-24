/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import {
  getMembersURL,
  getImgURL,
  getCloudinaryImgURL,
} from '@helper-functions/urls';
import fetch from 'cross-fetch';
import Home from '@components/home';
import Layout from '@components/layout';
import NotFound from '@components/not-found-page';
import { CACHE_MAX_AGE } from '@constants/cache-max-age.js';
import { WIDTH_200PX, HEIGHT_200PX } from '@constants/profile-image';
import { SET_ERRORS, SET_MEMBERS } from '@constants/AppConstants';
import { membersContext } from '@store/members/members-context';
import { useEffect } from 'react';

const Index = ({ members, newMembers, errorMsg }) => {
  const { dispatch } = membersContext();
  let loadComponent = '';
  useEffect(() => {
    if (errorMsg) {
      dispatch({ type: SET_ERRORS, payload: errorMsg });
    } else {
      dispatch({
        type: SET_MEMBERS,
        payload: { members, newMembers },
      });
    }
  }, [dispatch, errorMsg, members, newMembers]);

  loadComponent = errorMsg ? <NotFound /> : <Home />;

  return <Layout title="Members | Real Dev Squad">{loadComponent}</Layout>;
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);
  const membersDetails = [];
  const newMembersDetails = [];
  const {
    query: { dev },
  } = context;

  try {
    const res = await fetch(getMembersURL);
    if (res.status !== 200) {
      throw new Error(
        'There was some issues fetching the members, Please try again after some time'
      );
    }
    const { members } = await res.json();

    for (const memberData of members) {
      const { picture, username, isMember, first_name, archivedMember } =
        memberData;

      let img_url =
        dev && picture
          ? getCloudinaryImgURL(
              picture.publicId,
              `${WIDTH_200PX},${HEIGHT_200PX}`
            )
          : '/images/Avatar.png';
      if (!dev) img_url = getImgURL(username, 'img.png');

      // Filtering Members
      if (isMember) {
        membersDetails.push({
          ...memberData,
          img_url,
        });
      }

      // Filtering New Members
      if (!isMember && !archivedMember && first_name) {
        newMembersDetails.push({
          ...memberData,
          img_url,
        });
      }
    }

    // Sorting Members
    membersDetails.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));

    // Sorting New Members
    newMembersDetails.sort((a, b) =>
      a.first_name.toUpperCase() > b.first_name.toUpperCase() ? 1 : -1
    );

    return {
      props: { members: membersDetails, newMembers: newMembersDetails },
    };
  } catch (e) {
    return { props: { errorMsg: e.message } };
  }
}

Index.propTypes = {
  members: PropTypes.instanceOf(Array),
  newMembers: PropTypes.instanceOf(Array),
  errorMsg: PropTypes.string,
};

Index.defaultProps = {
  members: [],
  newMembers: [],
  errorMsg: '',
};

export default Index;
