/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import HeaderComponent from '../components/header/Header.component';
import AppProvider from '../hooks/_index';
import ToastComponent from '../components/toast/toast.component';
import { useToast } from '../hooks/toast';
import Drawer from '../components/header/components/Drawer.component';
import Loader from '../components/loader/loader.component';
import { useLoader } from '../hooks/loader';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);

  const { messages } = useToast();
  const { isLoading } = useLoader();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class">
      <AppProvider>
        <Loader />
        <HeaderComponent />
        <Drawer />
        <ToastComponent messages={messages} />
        {isLoading ? null : <Component {...pageProps} />}
      </AppProvider>
    </ThemeProvider>
  );
};

export default MyApp;
