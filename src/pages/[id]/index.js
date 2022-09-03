/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  getMembersDataURL,
  getContributionsURL,
  getCloudinaryImgURL,
} from '@helper-functions/urls';
import { fetch } from '@helper-functions/fetch';
import Profile from '@components/member-profile';
import NotFound from '@components/not-found-page';
import Layout from '@components/layout';
import { CACHE_MAX_AGE } from '@constants/cache-max-age.js';

import {
  WIDTH_200PX,
  WIDTH_40PX,
  HEIGHT_200PX,
  HEIGHT_40PX,
} from '@constants/profile-image';
import { useEffect, useState } from 'react';
import { userContext } from '@store/user/user-context';
import { UserTasksApi } from '@api/UserTasksApi';

const MemberProfile = ({ imageLink, user, contributions, errorMessage }) => {
  const { isSuperUser, userApiCalled, setUserPrivileges } = userContext();
  const [activeTasksData, setActiveTasksData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    UserTasksApi.getAll(id).then((listTasks) => setActiveTasksData(listTasks));
  }, [id]);

  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }

  if (!isSuperUser && !userApiCalled) {
    setUserPrivileges();
  }
  const { first_name = '', last_name = '' } = user;
  if (!isSuperUser && !user.roles?.member) {
    const errorMsg = `The Member Page for ${first_name} ${last_name} is not yet generated.`;
    return <NotFound errorMsg={errorMsg} />;
  }
  const memberName = `${first_name} ${last_name} | Member Real Dev Squad`;

  const devUser = !!router.query.dev;

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
