import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

import { useTheme } from 'next-themes';
import UserSvg from '../../icons/misc/user';
import YoutubeSvg from '../../icons/social/youtube';
import TelegramSvg from '../../icons/social/telegram';
import InstagramSvg from '../../icons/social/instagram';
import SunAndMoon from './SunAndMoon.component';
import { useAuth } from '../../context/AuthContext';

const HeaderComponent = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const switchTheme = () => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex h-20 p-5 content-center items-center justify-between bg-primary drop-shadow">
      <div className="flex items-center">
        <a href="/">
          <img className="w-14" src="/logo-gnk-1.png" alt="logo-gnk" />
        </a>
        <a className="ml-6" href="/">
          <YoutubeSvg />
        </a>
        <a className="ml-6" href="/">
          <TelegramSvg />
        </a>
        <a className="ml-6" href="/">
          <InstagramSvg />
        </a>
      </div>
      <div className="flex items-center justify-around">
        <a href="none" className="m-4 hover:text-accent">
          Seja membro
        </a>
        <a href="none" className="m-4 hover:text-accent">
          Mentoria
        </a>
        <a href="/sobre-nos" className="m-4 hover:text-accent">
          Sobre nós
        </a>
        <a className="m-4" href="/sign-in">
          <UserSvg />
        </a>
        {user ? (
          <button type="button" onClick={signOut}>
            SignOut
          </button>
        ) : null}
        <SunAndMoon switchTheme={switchTheme} />
      </div>
    </div>
  );
};

export default HeaderComponent;
