/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import HeaderComponent from '../components/header/Header.component';
import AppProvider from '../hooks';
import ToastComponent from '../components/toast/toast.component';
import { useToast } from '../hooks/toast';
import Drawer from '../components/header/Drawer.component';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);

  const { messages } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class">
      <AppProvider>
        <HeaderComponent />
        <Drawer />
        <ToastComponent messages={messages} />
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
};

export default MyApp;
