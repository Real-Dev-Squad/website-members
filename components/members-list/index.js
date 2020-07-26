import MemberListItem from 'components/member-list-item';
import Loader from 'components/loader';

import useFetchHook from 'custom-hooks/useFetchHook';
import classNames from './member-list.module.scss';

const URL = 'https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/ids/mapping.json';

const MembersList = () => {
  let { loading, error, data } = useFetchHook(URL);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    let rdsIds = Object.keys(data);
    console.log(rdsIds);
    return (
      <div className={classNames.container}>
        {rdsIds.map((rdsId) => (
          <div key={rdsId}>
            <MemberListItem rdsId={rdsId} />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default MembersList;
