import { getDataURL, getImgURL } from 'helper-functions/urls';
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
  const URL =
    'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

  const membersArr = [];
  let memberDetailsUrl = '';
  let resp1 = '';
  let jsonObj = '';

  try {
    const res = await fetch(URL);
    if (res.status !== 200) {
      throw new Error(
        'There was some issues fetching the members, Please try again after some time'
      );
    }
    let data = await res.json();

    for (const rdsid in data) {
      memberDetailsUrl = getDataURL(rdsid);
      resp1 = await fetch(memberDetailsUrl);
      if (resp1.status == 200) {
        jsonObj = await resp1.json();
        membersArr.push({
          ...jsonObj,
          img_url: getImgURL(rdsid, jsonObj.img)
        });
      }
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
