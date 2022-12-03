import classNames from '../badges.module.css';

export default function Badge(props) {
  const { name, imageUrl, description } = props;
  return (
    <figure
      data-tooltip={description}
      className={`${classNames.badge} ${classNames.badge__tooltip}`}
    >
      <img alt={name} src={imageUrl} className={classNames.badge__image} />
      <figcaption className={classNames.badge__caption}>{name}</figcaption>
    </figure>
  );
}
