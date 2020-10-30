import PropTypes from 'prop-types';
import classNames from './member-profile.module.scss';

const Profile = (props) => {
  const {
    membersData: { first_name, last_name },
    imageLink
  } = props;
  const memberName = `${first_name || ''} ${last_name || ''}`;
  const socialLinks = {
    instagram: 'https://staging-members-rds.herokuapp.com/icons/instagram.png',
    linkedin: 'https://staging-members-rds.herokuapp.com/icons/linkedin.png',
    github: 'https://staging-members-rds.herokuapp.com/icons/github.png',
    twitter: 'https://staging-members-rds.herokuapp.com/icons/twitter.png'
  };

  return (
    <div className={classNames.container}>
      <div className={(classNames.sidebar, classNames.column)}>
        <div className={classNames.memberDetails}>
          <img src={imageLink} className={classNames.profilePic} alt="ProfilePicture" />
          <div className={classNames.personalInfo}>
            <h1 className={classNames.profileName}>{memberName.trim() || '--'}</h1>
            <p className={classNames.userName}>@userName</p>
            <p className={classNames.workDetails}>
              FrontEnd Developer
              <br />
              <span className={classNames.userName}>WayCool.in</span>
            </p>
          </div>
          <div className={classNames.socialIcons}>
            <img src={socialLinks.instagram} alt="Instagram" />
            <img src={socialLinks.linkedin} alt="LinkedIn" />
            <img src={socialLinks.github} alt="GitHub" />
            <img src={socialLinks.twitter} alt="Twitter" />
          </div>
        </div>
      </div>

      <div className={(classNames.content, classNames.column)}>
        <div className={(classNames.section, classNames.card)}>
          <h2>
            <img
              src="https://www.iconfinder.com/data/icons/picons-basic-3/57/basic3-092_shape_badge_sticker-128.png"
              className={classNames.icon}
              alt="Badge Icon"
            />
            Badges
          </h2>
          <div className={classNames.badgeContainer}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0wrh4RPzsicylNFoflCJ7bRagLpsgs5o2VQ&usqp=CAU"
              className={classNames.badge}
              alt="badge"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0wrh4RPzsicylNFoflCJ7bRagLpsgs5o2VQ&usqp=CAU"
              className={classNames.badge}
              alt="badge"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0wrh4RPzsicylNFoflCJ7bRagLpsgs5o2VQ&usqp=CAU"
              className={classNames.badge}
              alt="badge"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0wrh4RPzsicylNFoflCJ7bRagLpsgs5o2VQ&usqp=CAU"
              className={classNames.badge}
              alt="badge"
            />
          </div>
        </div>

        <div className={(classNames.section, classNames.card)}>
          <h2>
            <img
              src="https://www.iconfinder.com/data/icons/octicons/1024/mark-github-128.png"
              className={classNames.icon}
              alt="GitHub logo"
            />
            Contributions
          </h2>
          <div className={classNames.contributions}>
            <div className={classNames.pullRequest}>
              <svg
                className={classNames.prIcon}
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true">
                <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
              </svg>
              <a
                href="https://github.com/Real-Dev-Squad/website-backend/pull/26"
                className={classNames.title}>
                User details
              </a>
              <p className={classNames.description}>
                #26 opened 7 days ago by <span className={classNames.gitUserName}> whyDontI</span> •
                Changes requested
              </p>
            </div>

            <div className={classNames.pullRequest}>
              <svg
                className={classNames.prIcon}
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true">
                <path
                  fill-
                  rule="evenodd"
                  d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
              </svg>
              <a
                href="https://github.com/Real-Dev-Squad/website-backend/pull/26"
                className={classNames.title}>
                {' '}
                User details
              </a>
              <p className={classNames.description}>
                #26 opened 7 days ago by <span className={classNames.gitUserName}> whyDontI</span> •
                Changes requested
              </p>
            </div>

            <div className={classNames.pullRequest}>
              <svg
                className={classNames.prIcon}
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true">
                <path
                  fill-
                  rule="evenodd"
                  d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
              </svg>
              <a
                href="https://github.com/Real-Dev-Squad/website-backend/pull/26"
                className={classNames.title}>
                {' '}
                User details
              </a>
              <p className={classNames.description}>
                #26 opened 7 days ago by <span className={classNames.gitUserName}> whyDontI</span> •
                Changes requested
              </p>
            </div>

            <div className={classNames.button}>Load More...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  imageLink: PropTypes.string,
  membersData: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string
  })
};

Profile.defaultProps = {
  imageLink: '',
  membersData: {
    first_name: '',
    last_name: ''
  }
};

export default Profile;
