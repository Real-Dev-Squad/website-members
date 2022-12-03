import badgesClassNames from './badges.module.css';
import classNames from '../member-profile.module.scss';
import Badge from './badge';

export default function Badges(props) {
  const { badges, isSuperUser } = props;
  return (
    <div className={`${classNames.card} ${badgesClassNames.badges}`}>
      <h2>Badges</h2>
      {!!badges.length && (
        <div className={badgesClassNames['badges--container']}>
          {badges.map((badge) => (
            <Badge key={badge.id} {...badge} />
          ))}
        </div>
      )}
      {!badges.length && (
        <h5 className={classNames.prDescription}>No bages assigned</h5>
      )}
      {isSuperUser && (
        <div className={badgesClassNames['badges__btn--container']}>
          <button
            color="primary"
            type="submit"
            className={classNames.submitButton}
            title="Add new bagde"
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}
