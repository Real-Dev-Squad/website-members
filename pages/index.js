import { getImgURL, getMembersURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import HomePage from '../components/pages';
import Layout from '../components/layout';
import NotFound from 'components/not-found-page';
import { CACHE_MAX_AGE } from '../constants/cache-max-age.js';

const Index = ({ membersArr, errorMsg }) => {
  let loadComponent = '';
  if (errorMsg) {
    loadComponent = <NotFound errorMsg={errorMsg} />;
  } else {
    loadComponent = <HomePage membersArr={membersArr} />;
  }

  return <Layout title={'Members | Real Dev Squad'}>{loadComponent}</Layout>;
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);

  const membersArr = [];

  try {
    const res = await fetch(getMembersURL);
    if (res.status !== 200) {
      throw new Error(
        'There was some issues fetching the members, Please try again after some time'
      );
    }
    const { members } = await res.json();

    members.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
    for (const memberData of members) {
      membersArr.push({
        ...memberData,
        img_url: getImgURL(memberData.username, 'img.png')
      });
    }

    return { props: { membersArr } };
  } catch (e) {
    return { props: { errorMsg: e.message } };
  }
}

Index.propTypes = {
  membersArr: PropTypes.array,
  errorMsg: PropTypes.string
};

Index.defaultProps = {
  membersArr: [],
  errorMsg: ''
};

export default Index;
