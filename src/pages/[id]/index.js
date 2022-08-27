/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  getMembersDataURL,
  getContributionsURL,
  getActiveTasksURL,
  getCloudinaryImgURL,
} from '@helper-functions/urls';
import { fetch } from '@helper-functions/fetch';
import Profile from '@components/member-profile';
import NotFound from '@components/not-found-page';
import Layout from '@components/layout';
import { CACHE_MAX_AGE } from '@constants/cache-max-age.js';
import { unAuthorizedPageViewError } from '@constants/error-messages';
import {
  WIDTH_200PX,
  WIDTH_40PX,
  HEIGHT_200PX,
  HEIGHT_40PX,
} from '@constants/profile-image';
import { useEffect, useState, useCallback } from 'react';
import { userContext } from '@store/user/context';

const MemberProfile = ({ imageLink, user, contributions, errorMessage }) => {
  const { isSuperUserMode } = userContext();
  const [activeTasksData, setActiveTasksData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }
  if (!user.roles?.member && !isSuperUserMode) {
    return <NotFound errorMsg={unAuthorizedPageViewError} />;
  }

  const fillActiveTasksArray = useCallback(async () => {
    const tasksURL = getActiveTasksURL(id);
    try {
      const tasksResponse = await fetch(tasksURL);
      const { tasks } = await tasksResponse.data;
      setActiveTasksData(tasks);
    } catch {
      setActiveTasksData([]);
    }
  }, [id]);

  useEffect(() => {
    fillActiveTasksArray();
  }, [fillActiveTasksArray]);

  const { first_name = '', last_name = '' } = user;
  const memberName = `${first_name} ${last_name} | Member Real Dev Squad`;

  const { query } = useRouter(); // this needs to be changed
  const devUser = !!query.dev;

  return (
    <Layout title={memberName}>
      <Profile
        imageLink={imageLink}
        membersData={user}
        contributions={contributions}
        devUser={devUser}
        tasks={activeTasksData}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);
  const {
    params: { id },
  } = context;
  const jsonUrl = getMembersDataURL(id);
  const contributionsURL = getContributionsURL(id);
  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error(
        `The user ${id} you're trying to find doesn't exist with us, please go to members to see all the available members we have`
      );
    }
    const { user } = await res.data;
    const getImageLink = (transformString) => {
      return user.picture
        ? getCloudinaryImgURL(user.picture.publicId, transformString)
        : '/images/Avatar.png';
    };
    const contributionsResponse = await fetch(contributionsURL);
    const contributions = await contributionsResponse.data;
    const imageLink = {
      w_200: getImageLink(`${WIDTH_200PX},${HEIGHT_200PX}`),
      w_40: getImageLink(`${WIDTH_40PX},${HEIGHT_40PX}`),
    };
    return { props: { imageLink, user, contributions } };
  } catch (e) {
    return { props: { errorMessage: e.message } };
  }
}

MemberProfile.propTypes = {
  imageLink: PropTypes.shape({
    w_200: PropTypes.string,
    w_40: PropTypes.string,
  }),
  user: PropTypes.instanceOf(Object),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.instanceOf(Array),
    all: PropTypes.instanceOf(Array),
  }),
  errorMessage: PropTypes.string,
};

MemberProfile.defaultProps = {
  imageLink: {
    w_200: '',
    w_40: '',
  },
  user: {},
  contributions: {
    noteworthy: [],
    all: [],
  },
  errorMessage: '',
};

export default MemberProfile;
