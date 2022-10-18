/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
// import { themeChange } from 'theme-change';
import HeaderComponent from '../components/header/Header.component';
import { AuthProvider } from '../context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <HeaderComponent />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
