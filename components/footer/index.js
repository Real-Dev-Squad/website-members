import React from 'react';
import classNames from '../../styles/global-style.scss';

const Footer = () => {
  return (
    <footer>
	   <p className={classNames.info-repo}>The contents of this website are deployed from this <a href="https://github.com/Real-Dev-Squad/website-members" target="_blank" rel="noopener noreferrer">open sourced repo</a></p>
	</footer>
  );
};

export default Footer;
