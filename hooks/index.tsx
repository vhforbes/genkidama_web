import React from 'react';

import { AuthProvider } from './auth';
import { DrawerProvider } from './drawer';
import { LoaderProvider } from './loader';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <LoaderProvider>
      <AuthProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </AuthProvider>
    </LoaderProvider>
  </ToastProvider>
);

export default AppProvider;
