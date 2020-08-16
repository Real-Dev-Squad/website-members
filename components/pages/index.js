import PropTypes from 'prop-types';
import MemberList from 'components/members-list';
import classNames from './home-page.module.scss';

const HomePage = ({ membersKey }) => {
  return (
    <div className={classNames.container}>
      <img className={classNames.img} src="/images/Real-Dev-Squad@1x.png" alt="real-dev squad" />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
      <MemberList membersKey={membersKey} />
    </div>
  );
};

HomePage.propTypes = {
  membersKey: PropTypes.object
};

HomePage.defaultProps = {
  membersKey: {}
};

export default HomePage;
