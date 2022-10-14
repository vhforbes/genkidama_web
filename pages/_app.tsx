/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import HeaderComponent from '../components/header.component';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <HeaderComponent />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
