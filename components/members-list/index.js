import Loader from 'components/loader';
import useFetchHook from 'custom-hooks/useFetchHook';

const URL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

const MembersList = () => {
  let { loading, error, data } = useFetchHook(URL);
  console.log(loading, error, data);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    return <div>data</div>;
  }

  return null;
};

export default MembersList;
