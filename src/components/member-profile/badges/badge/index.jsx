import classNames from '../../member-profile.module.scss';

export default function Badge(props) {
  const { name, imageUrl } = props;
  return (
    <div>
      <img alt={name} src={imageUrl} className={classNames.badge} />
    </div>
  );
}
