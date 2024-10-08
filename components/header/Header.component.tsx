import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

import { useTheme } from 'next-themes';
import { useDrawer } from '../../hooks/drawer';

import YoutubeSvg from '../../icons/social/youtube';
import TelegramSvg from '../../icons/social/telegram';
// import InstagramSvg from '../../icons/social/instagram';
import SunAndMoon from './components/SunAndMoon.component';
import HambuerguerSvg from '../../icons/misc/hambuerguer';
import UserDropdownComponent from './components/UserDropdown.component';
import { useAuth } from '../../hooks/auth';

const HeaderComponent = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
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
    <div className="bg-primary drop-shadow sticky top-0 z-30">
      {/* ------ HEADER DESKTOP ------ */}
      <div className="hidden md:flex content-center items-center justify-between h-20 p-5">
        <div className="flex items-center">
          <a href="/home">
            <img className="w-14" src="/logo-gnk-1.png" alt="logo-gnk" />
          </a>
          <a
            className="ml-6"
            href="https://www.youtube.com/@GNKcripto"
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeSvg />
          </a>
          <a
            className="ml-6"
            href="https://t.me/genkidamaskills"
            target="_blank"
            rel="noreferrer"
          >
            <TelegramSvg />
          </a>
          {/* <a className="ml-6" href="/">
            <InstagramSvg />
          </a> */}
        </div>
        <div className="flex items-center justify-around">
          {user?.role === 'ADMIN' ? (
            <a href="/admin" className="m-4 hover:text-accent">
              PAINEL ADMINISTRADOR
            </a>
          ) : null}
          {!user ? (
            <a
              href="/parceiro-bitget"
              className="m-4 hover:text-lightTeal font-bold"
            >
              Seja um parceiro Bitget
            </a>
          ) : null}
          <a href="/live" className="m-4 hover:text-accent">
            Ao vivo
          </a>
          <a href="/mentoria" className="m-4 hover:text-accent">
            Mentoria
          </a>
          {/* <a href="/sobre-nos" className="m-4 hover:text-accent">
            Sobre nós
          </a> */}
          <SunAndMoon switchTheme={switchTheme} />
          <UserDropdownComponent />
        </div>
      </div>
      {/* ------ HEADER MOBILE ------ */}
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
          <UserDropdownComponent />
          <SunAndMoon switchTheme={switchTheme} />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
