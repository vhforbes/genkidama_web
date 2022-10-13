import React, { useState } from 'react';
import { useTheme } from 'next-themes';

const HeaderComponent = () => {
  const { theme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState('');

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setThemeIcon('/icons/sun.svg');
    } else {
      setThemeIcon('/icons/moon.svg');
      setTheme('light');
    }
  };

  return (
    <div className="flex h-20 p-5 content-center items-center justify-between bg-white dark:bg-deepIndigo drop-shadow">
      <div>
        <p className="dark:text-white">logo</p>
      </div>
      <div className="flex items-center justify-around dark:text-white">
        <a
          href="none"
          className="m-4 hover:text-orange dark:text-white dark:hover:text-orange"
        >
          Seja membro
        </a>
        <a
          href="none"
          className="m-4 hover:text-orange dark:text-white dark:hover:text-orange"
        >
          Mentoria
        </a>
        <a
          href="none"
          className="m-4 hover:text-orange dark:text-white dark:hover:text-orange"
        >
          Sobre nós
        </a>
        <span>|</span>
        <button
          className="ml-4 pt-1"
          type="button"
          onClick={() => switchTheme()}
        >
          <img alt="theme-icon" src={themeIcon} />
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
