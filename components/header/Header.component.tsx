import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

import { useTheme } from 'next-themes';
import { useAuth } from '../../hooks/auth';
import { useDrawer } from '../../hooks/drawer';

import UserSvg from '../../icons/misc/user';
import YoutubeSvg from '../../icons/social/youtube';
import TelegramSvg from '../../icons/social/telegram';
import InstagramSvg from '../../icons/social/instagram';
import SunAndMoon from './components/SunAndMoon.component';
import HambuerguerSvg from '../../icons/misc/hambuerguer';

const HeaderComponent = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { openClose } = useDrawer();

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
    <div className="bg-primary drop-shadow sticky top-0 z-10">
      {/* HEADER DESKTOP */}
      <div className="hidden md:flex content-center items-center justify-between h-20 p-5">
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
          <a href="/live" className="m-4 hover:text-accent">
            Ao vivo
          </a>
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
      {/* HEADER MOBILE */}
      <div className="md:hidden flex content-center items-center justify-between h-20 p-5">
        <div className="w-20">
          <button type="button" onClick={() => openClose()}>
            <HambuerguerSvg />
          </button>
        </div>
        <a href="/">
          <img className="w-14" src="/logo-gnk-1.png" alt="logo-gnk" />
        </a>
        <div className="flex items-center justify-around w-20">
          <UserSvg />
          <SunAndMoon switchTheme={switchTheme} />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
