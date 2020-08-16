import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import HomePage from '../components/pages';
import Layout from '../components/layout';
import NotFound from 'components/not-found-page';

const Index = ({ data, errorMsg }) => {
  let loadComponent = '';
  if (errorMsg) {
    loadComponent = <NotFound errorMsg={errorMsg} />;
  } else {
    loadComponent = <HomePage membersKey={data} />;
  }

  return <Layout title={'Members | Real Dev Squad'}>{loadComponent}</Layout>;
};

export async function getServerSideProps() {
  const URL =
    'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

  try {
    const res = await fetch(URL);
    if (res.status !== 200) {
      throw new Error(
        'There was some issues fetching the members, Please try again after some time'
      );
    }
    const data = await res.json();
    return { props: { data } };
  } catch (e) {
    return { props: { errorMsg: e.message } };
  }
}

Index.propTypes = {
  data: PropTypes.object,
  errorMsg: PropTypes.string
};

Index.defaultProps = {
  data: {},
  errorMsg: ''
};

export default Index;
