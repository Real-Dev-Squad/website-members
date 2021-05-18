import { getMembersURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import HomePage from '../components/pages';
import Layout from '../components/layout';
import NotFound from 'components/not-found-page';
import { CACHE_MAX_AGE } from '../constants/cache-max-age.js';

const Index = ({ membersArr, newMembersArr, errorMsg }) => {
  let loadComponent = '';
  if (errorMsg) {
    loadComponent = <NotFound errorMsg={errorMsg} />;
  } else {
    loadComponent = <HomePage membersArr={membersArr} newMembersArr={newMembersArr} />;
  }

  return <Layout title={'Members | Real Dev Squad'}>{loadComponent}</Layout>;
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);

  const membersWithImage = [];

  try {
    const res = await fetch(getMembersURL);
    if (res.status !== 200) {
      throw new Error(
        'There was some issues fetching the members, Please try again after some time'
      );
    }
    const { members } = await res.json();

    for (const memberData of members) {
      membersWithImage.push({
        ...memberData,
        img_url: getImgURL(memberData.username, 'img.png')
      });
    }

    const membersArr = membersWithImage.filter((person) => {
      return person.isMember;
    });
    membersArr.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));

    const newMembersArr = membersWithImage.filter((person) => {
      return !person.isMember;
    });
    newMembersArr.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));

    return { props: { membersArr, newMembersArr } };
  } catch (e) {
    return { props: { errorMsg: e.message } };
  }
}

Index.propTypes = {
  membersArr: PropTypes.array,
  newMembersArr: PropTypes.array,
  errorMsg: PropTypes.string
};

Index.defaultProps = {
  membersArr: [],
  newMembersArr: [],
  errorMsg: ''
};

export default Index;
