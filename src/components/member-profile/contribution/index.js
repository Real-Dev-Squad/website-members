/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from '@components/member-profile/contribution/contribution.module.scss';
import PRLink from '@components/member-profile/contribution/pr-link';
import { timeWas } from '@helper-functions/time-was';
import { HOST_NAME } from '@constants/AppConstants';
import { useState, useEffect, useContext } from 'react';
import Modal from '@components/UI/modal';
import { ContributionContext } from '@store/contributions/ContributionContext.js';
import { userContext } from '@store/user/user-context';

const renderPRLinks = (prList) =>
  prList.map(({ url }, index) => {
    return <PRLink link={url} key={index} />;
  });

const Contribution = ({ contribution, fullName, imageLink, devUser }) => {
  const {
    task: { featureUrl },
    prList,
  } = contribution;
  const url = featureUrl || prList[0]?.url;
  const gotoUrl = () => url && window.open(url, '_blank');
  const urlObj = url && new URL(url);
  const contributionCard = () => (
    <ContributionCard
      contribution={contribution}
      fullName={fullName}
      imageLink={imageLink}
      devUser={devUser}
      url={url}
      urlObj={urlObj}
    />
  );
  const renderFeatureCard = () => {
    if (urlObj?.host === HOST_NAME) {
      return (
        <Link href={urlObj.pathname}>
          <div className={url && classNames.contributionCard}>
            {contributionCard()}
          </div>
        </Link>
      );
    }
    return (
      <div
        className={url && classNames.contributionCard}
        onClick={gotoUrl}
        onKeyDown={gotoUrl}
        aria-hidden="true"
      >
        {contributionCard()}
      </div>
    );
  };

  return renderFeatureCard();
};

const ContributionCard = ({
  contribution,
  fullName,
  imageLink,
  devUser,
  url,
  urlObj,
}) => {
  const {
    task: { title, startedOn, endsOn, status, purpose },
    prList,
  } = contribution;
  const isTitleAvailable = !!title;
  const featureTitle = isTitleAvailable ? title : prList[0].title;
  const [style, setStyle] = useState({ display: 'none' });
  // const [styleDefault, setStyleDefault] = useState({ display: 'block', height: "30px", width: "30px" });
  const [modalState, setModalState] = useState(false);
  const { contributions, dispatch } = useContext(ContributionContext);
  const { isSuperUserMode } = userContext();
  const children = (
    <div>
      <div>
        <button className={classNames.button} onClick={(e) => { e.stopPropagation(); dispatch({ type: 'noteworthy', payload: { title: featureTitle } }) }}>Move to Noteworthy</button>
      </div>

      <div>
        <button className={classNames.button} onClick={(e) => { e.stopPropagation(); dispatch({ type: 'all', payload: { title: featureTitle } }) }}>Move to All</button>
      </div>
      <div>
        <button className={classNames.button} onClick={(e) => { e.stopPropagation(); dispatch({ type: 'other', payload: { title: featureTitle } }) }}>Move to Others</button>
      </div>
      <div>
        <button className={classNames.closeButton} onClick={(e) => { e.stopPropagation(); setModalState(false) }}>Close the modal</button>
      </div>
    </div>
  );

  const renderFeatureUrl = (featureUrl, featureUrlObj) => {
    if (featureUrlObj.host === HOST_NAME) {
      return (
        <Link
          href={featureUrlObj.pathname}
          onClick={(e) => e.stopPropagation()}
        >
          Check out this feature in action
        </Link>
      );
    }
    return (
      <a
        href={featureUrl}
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noreferrer"
      >
        Check out this feature in action
      </a>
    );
  };
  let completedText = '';
  let completedDate = '';
  let featureLiveOnText = '';
  let featureLiveDate = '';

  if (isTitleAvailable) {
    if (status === 'Active') {
      completedText = <span>Estimated Completion: </span>;
      completedDate = timeWas(startedOn * 1000, false, endsOn * 1000);
    } else {
      completedDate = timeWas(endsOn * 1000);
      completedText = <span>Completed in: </span>;
      featureLiveDate = timeWas(endsOn * 1000, true);
      featureLiveOnText = featureLiveDate;
    }
  } else {
    const createdAt = +new Date(prList[0].createdAt);
    const updatedAt = +new Date(prList[0].updatedAt);
    if (prList[0].state === 'closed') {
      completedDate = timeWas(createdAt, false, updatedAt);
      completedText = (
        <span className={classNames.completedText}>Completed in </span>
      );
      featureLiveDate = timeWas(updatedAt, true);
      featureLiveOnText = featureLiveDate;
    }
  }
  return (
    <>{modalState && (<Modal show={modalState} closeModal={(e) => {
      e.stopPropagation();
      e.preventDefault();
      setModalState(false);
    }}>
      {children}
    </Modal>)}
      <div
        onMouseEnter={e => {
          setStyle({ display: 'block', height: "30px", width: "30px" });
          //  setStyleDefault({ display: 'none' });

          console.log("Entereed");
        }}

        onMouseOver={e => {
          setStyle({ display: 'block', height: "30px", width: "30px" });
          //  setStyleDefault({ display: 'none' });

          console.log("Entereed");
        }}

        onMouseLeave={e => {
          setStyle({ display: 'none', height: "30px", width: "30px" })
          //  setStyleDefault({ display: 'block', height: "30px", width: "30px" });
        }}
      >
        <div className={classNames.contributionContainer}>
          <div className={classNames.leftSection}>
            <h3 className={classNames.featureTitle}>{featureTitle}</h3>
            <p className={classNames.prDescription}>{purpose}</p>
            <div className={classNames.completedData}>
              {completedText}
              <p className={classNames.completedDate}>{completedDate}</p>
            </div>
            {featureLiveOnText && (
              <div className={classNames.featureLiveOnText}>
                <span>Feature live on {featureLiveOnText}</span>
              </div>
            )}
          </div>
          <div className={classNames.rightSection}>
            {/*<div style={styleDefault}></div>*/}
            <>{
              isSuperUserMode && isTitleAvailable &&
              (<div style={{ display: "flex" }}>
                <span style={{ height: "30px", width: "100px", display: "inline-block" }}></span>
                <div className={classNames.settingsContainer} style={style}>
                  <button
                    className={classNames.settingsButton}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setModalState(true) }}
                  >
                    <img
                      className={classNames.settingsIcon}
                      src="/icons/settings.png"
                      alt="contribution_catgy"
                    />
                  </button>
                </div>

              </div>)
            }</>
            <div className={classNames.prLink}>{renderPRLinks(prList)}</div>
            <div className={classNames.userIcon}>
              <img src={imageLink} alt="participantsIcon" />
              <span>{fullName}</span>
            </div>
            {devUser && (
              <div className={classNames.tags}>
                <button type="button">DX</button>
                <button type="button">NodeJS</button>
              </div>
            )}
          </div>
        </div>
        {url && (
          <div className={classNames.featureLink}>
            {renderFeatureUrl(url, urlObj)}
          </div>
        )}
        <hr className={classNames.line} />
      </div>
    </>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    prList: PropTypes.instanceOf(Array),
    task: PropTypes.instanceOf(Object),
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  devUser: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

ContributionCard.propTypes = {
  contribution: PropTypes.shape({
    prList: PropTypes.instanceOf(Array),
    task: PropTypes.instanceOf(Object),
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  devUser: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  urlObj: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Contribution;
