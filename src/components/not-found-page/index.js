import classNames from '@components/not-found-page/not-found-page.module.scss';

const Index = ({ errorMsg }) => {
  return (
    <div className={classNames.fullPageContainer}>
      <img
        src="/images/page-not-found.png"
        alt="page not found"
        className={classNames.notFoundImage}
      />
      <p className={classNames.errorTxt}>{errorMsg}</p>
    </div>
  );
};

export default Index;
