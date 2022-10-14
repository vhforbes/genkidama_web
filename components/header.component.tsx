import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import MoonSvg from '../icons/misc/moon';
import SunSvg from '../icons/misc/sun';
import UserSvg from '../icons/misc/user';
import YoutubeSvg from '../icons/social/youtube';
import TelegramSvg from '../icons/social/telegram';
import InstagramSvg from '../icons/social/instagram';

const HeaderComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const themeIcon = () => {
    if (theme === 'light') {
      return <MoonSvg />;
    }
    return <SunSvg />;
  };

  return (
    <div className="flex h-20 p-5 content-center items-center justify-between bg-lightTeal dark:bg-slate900 drop-shadow">
      <div className="flex items-center">
        <img className="w-14" src="/logo-gnk-1.png" alt="logo-gnk" />
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
      <div className="flex items-center justify-around dark:text-white">
        <a
          href="none"
          className=" m-4 hover:text-orange dark:text-white dark:hover:text-orange"
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
        <button className="m-4" type="button">
          <UserSvg />
        </button>
        <button className="m-4" type="button" onClick={() => switchTheme()}>
          {themeIcon()}
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
