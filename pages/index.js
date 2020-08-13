import HomePage from '../components/pages/index';
import fetch from 'cross-fetch';
import PropTypes from 'prop-types';
import NotFound from 'components/not-found-page';

const Index = ({ data, errorMsg }) => {
  if (errorMsg) {
    return <NotFound errorMsg={errorMsg} />;
  }
  return (
    <div>
      <HomePage membersKey={data} />
    </div>
  );
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
