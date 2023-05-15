import classNames from '@components/member-profile/contribution/contribution.module.scss';
import { useState } from 'react';
import SuperUserOptions from '@components/member-profile/super-user-options/container';

const ContributionCollapsedCard = ({ contribution }) => {
  const {
    task: { id, title, isNoteworthy, isCollapsed },
    prList,
  } = contribution;
  const isTitleAvailable = !!title;
  const featureTitle = isTitleAvailable ? title : prList[0].title;
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={classNames.contributionContainer}>
        <div className={classNames.leftSection}>
          <h3 className={classNames.featureTitle}>{featureTitle}</h3>
        </div>
        <div className={classNames.rightSection}>
          <SuperUserOptions
            showSettings={showSettings}
            isNoteworthy={isNoteworthy}
            isCollapsed={isCollapsed}
            taskId={id}
          />
        </div>
      </div>
      <hr className={classNames.line} />
    </div>
  );
};

export default ContributionCollapsedCard;
