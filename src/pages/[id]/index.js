/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  getMembersDataURL,
  getImgURL,
  getContributionsURL,
  getActiveTasksURL,
} from '@helper-functions/urls';
import { fetch } from '@helper-functions/fetch';
import Profile from '@components/member-profile';
import NotFound from '@components/not-found-page';
import Layout from '@components/layout';
import { CACHE_MAX_AGE } from '@constants/cache-max-age.js';
import { useEffect, useState } from 'react';

const MemberProfile = ({
  imageLink,
  user,
  contributions,
  tasks,
  errorMessage,
}) => {
  const [activeTasksData, setActiveTasksData] = useState([tasks]);
  useEffect(() => {
    const tasksURL = getActiveTasksURL(id);
    const tasksResponse = await fetch(tasksURL);
    const { tasks } = await tasksResponse.data;
    setActiveTasksData(tasks);
  },[]);

  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }

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

    const contributionsResponse = await fetch(contributionsURL);
    const contributions = await contributionsResponse.data;
    const imageLink = getImgURL(id, 'img.png');

    return { props: { imageLink, user, contributions, tasks } };
  } catch (e) {
    return { props: { errorMessage: e.message } };
  }
}

MemberProfile.propTypes = {
  imageLink: PropTypes.string,
  user: PropTypes.instanceOf(Object),
  contributions: PropTypes.shape({
    noteworthy: PropTypes.instanceOf(Array),
    all: PropTypes.instanceOf(Array),
  }),
  tasks: PropTypes.instanceOf(Array),
  errorMessage: PropTypes.string,
};

MemberProfile.defaultProps = {
  imageLink: '',
  user: {},
  contributions: {
    noteworthy: [],
    all: [],
  },
  tasks: [],
  errorMessage: '',
};

export default MemberProfile;
