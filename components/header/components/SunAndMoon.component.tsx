import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import MoonSvg from '../../../icons/misc/moon';
import SunSvg from '../../../icons/misc/sun';

const SunAndMoon = ({ switchTheme }: { switchTheme: () => void }) => {
  const { theme } = useTheme();
  const [iconSwap, setIconSwap] = useState({
    sun: '',
    moon: '',
  });

  const setIconOnAccordingToTheme = () => {
    if (theme === 'light') {
      setIconSwap({
        sun: 'swap-on',
        moon: 'swap-off',
      });
    } else {
      setIconSwap({
        sun: 'swap-off',
        moon: 'swap-on',
      });
    }
  };

  useEffect(() => {
    setIconOnAccordingToTheme();
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="m-4 swap swap-rotate">
        <input onClick={() => switchTheme()} type="checkbox" />
        <MoonSvg swap={iconSwap.moon} />
        <SunSvg swap={iconSwap.sun} />
      </label>
    </div>
  );
};

export default SunAndMoon;
