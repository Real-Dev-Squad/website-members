/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { darkModeContext } from '@store/dark-mode/dark-mode-context';
import classNames from './dark-mode.module.scss';

function DarkThemeIcon() {
  const { theme, themeToggler } = darkModeContext();

  return (
    <div
      onClick={themeToggler}
      onKeyDown={themeToggler}
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
