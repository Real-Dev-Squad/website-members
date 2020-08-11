import { getDataURL, getImgURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import fetch from 'cross-fetch';
import Error from 'next/error';
import Profile from 'components/member-profile';
import NotFound from 'components/not-found-page';

const MemberProfile = ({ imageLink, data, errorMessage }) => {
  if (errorMessage) {
    return <NotFound errorMsg={errorMessage} />;
  }
  return <Profile imageLink={imageLink} membersData={data} />;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const imageLink = getImgURL(params.id);
  const jsonUrl = getDataURL(params.id);

  try {
    const res = await fetch(jsonUrl);
    if (res.status !== 200) {
      throw new Error(
        `The user ${params.id} you're trying to find doesn't exist with us, please go to members to see all the available members we have`
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
