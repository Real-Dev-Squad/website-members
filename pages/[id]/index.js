import PropTypes from 'prop-types';
import { getDataURL, getImgURL } from 'helper-functions/urls';
import fetch from 'cross-fetch';
import Profile from 'components/member-profile';
import NotFound from 'components/not-found-page';
import Layout from 'components/layout';
import { CACHE_MAX_AGE } from '../../constants/cache-max-age.js';

const MemberProfile = ({ imageLink, data, errorMessage }) => {
  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }

  const { first_name = '', last_name = '' } = data;
  const memberName = `${first_name} ${last_name} | Member Real Dev Squad`;

  return (
    <Layout title={memberName}>
      <Profile imageLink={imageLink} membersData={data} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`);
  const {
    params: { id }
  } = context;
  const imageLink = getImgURL(id);
  const jsonUrl = getDataURL(id);

  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error(
        `The user ${id} you're trying to find doesn't exist with us, please go to members to see all the available members we have`
      );
    }
    const data = await res.json();

    return { props: { imageLink, data } };
  } catch (e) {
    return { props: { errorMessage: e.message } };
  }
}

MemberProfile.propTypes = {
  imageLink: PropTypes.string,
  data: PropTypes.object,
  errorMessage: PropTypes.string
};

MemberProfile.defaultProps = {
  imageLink: '',
  data: {},
  errorMessage: ''
};

export default MemberProfile;
