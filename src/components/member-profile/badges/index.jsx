import classNames from '../member-profile.module.scss';
import Badge from './badge';

export default function Badges(props) {
  const { badges, isSuperUser } = props;
  return (
    <div className={`${classNames.card} ${classNames.badges}`}>
      <h2>Badges</h2>
      {!!badges.length && (
        <div className={classNames['badges--container']}>
          {badges.map((badge) => (
            <Badge key={badge.id} {...badge} />
          ))}
        </div>
      )}
      {!badges.length && (
        <h5 className={classNames.prDescription}>No bages assigned</h5>
      )}
      {isSuperUser && (
        <div className={classNames['badges__btn--container']}>
          <button
            color="primary"
            type="submit"
            className={classNames.submitButton}
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}
