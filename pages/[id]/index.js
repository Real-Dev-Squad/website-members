import PropTypes from 'prop-types';
import { getDataURL, getImgURL, getContributionsURL } from 'helper-functions/urls';
import { fetch } from 'helper-functions/fetch';
import Profile from 'components/member-profile';
import NotFound from 'components/not-found-page';
import Layout from 'components/layout';
import { CACHE_MAX_AGE } from '../../constants/cache-max-age.js';

const MemberProfile = ({ imageLink, data, contributions, errorMessage }) => {
  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }

  const { first_name = '', last_name = '' } = data;
  const memberName = `${first_name} ${last_name} | Member Real Dev Squad`;

  return (
    <Layout title={memberName}>
      <Profile imageLink={imageLink} membersData={data} contributions={contributions} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);
  const {
    params: { id }
  } = context;
  const jsonUrl = getDataURL(id);
  const contributionsURL = getContributionsURL(id);

  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error(
        `The user ${id} you're trying to find doesn't exist with us, please go to members to see all the available members we have`
      );
    }
    const data = await res.data;

    const contributionsResponse = await fetch(contributionsURL);
    const contributions = await contributionsResponse.data;
    const imageLink = getImgURL(id, data.img);

    return { props: { imageLink, data, contributions } };
  } catch (e) {
    return { props: { errorMessage: e.message } };
  }
}

MemberProfile.propTypes = {
  imageLink: PropTypes.string,
  data: PropTypes.object,
  contributions: PropTypes.shape({
    noteworthy: PropTypes.array,
    all: PropTypes.array
  }),
  errorMessage: PropTypes.string
};

MemberProfile.defaultProps = {
  imageLink: '',
  data: {},
  contributions: {
    noteworthy: [],
    all: []
  },
  errorMessage: ''
};

export default MemberProfile;
