import useFetchHook from 'custom-hooks/useFetchHook';

const URL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';
const MembersList = () => {
  let { loading, error, data } = useFetchHook(URL);
  console.log(loading, error, data);

  return <div>Rendering List</div>;
};

export default MembersList;
