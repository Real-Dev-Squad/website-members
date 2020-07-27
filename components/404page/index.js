import classNames from './not-found-page.module.scss';

export default function index() {
  return (
    <div className={classNames.fullPageContainer}>
      <img
        src="/images/page-not-found.png"
        alt="page not found"
        className={classNames.notFoundImage}
      />
    </div>
  );
}
