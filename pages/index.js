import { getDataURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import HomePage from '../components/pages';
import Layout from '../components/layout';
import NotFound from 'components/not-found-page';

const Index = ({ data, errorMsg }) => {
  // console.log(data);
  // return <p>Hello</p>;
  let loadComponent = '';
  if (errorMsg) {
    loadComponent = <NotFound errorMsg={errorMsg} />;
  } else {
    loadComponent = <HomePage membersArr={data} />;
  }

  return <Layout title={'Members | Real Dev Squad'}>{loadComponent}</Layout>;
};

export async function getServerSideProps() {
  const URL =
    'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

  let membersArr = [];
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
      jsonObj = await resp1.json();
      membersArr.push({
        ...jsonObj,
        img_url: getImgURL(rdsid)
      });
    }

    data = membersArr;

    return { props: { data } };
  } catch (e) {
    return { props: { errorMsg: e.message } };
  }
}

Index.propTypes = {
  data: PropTypes.array,
  errorMsg: PropTypes.string
};

Index.defaultProps = {
  data: [],
  errorMsg: ''
};

export default Index;
