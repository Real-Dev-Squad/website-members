import React from 'react';
import classNames from './dark-mode.module.scss';

function DarkThemeIcon({ theme, themeToggleHandler }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={themeToggleHandler}
      onKeyDown={themeToggleHandler}
      className={classNames.container}
    >
      {theme === 'light' ? (
        <img src="/images/moon.png" alt="moon" />
      ) : (
        <img src="/images/sun.png" alt="sun" />
      )}
    </div>
  );
}

export default DarkThemeIcon;
