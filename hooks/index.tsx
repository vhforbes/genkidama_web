import React from 'react';

import { AuthProvider } from './auth';
import { DrawerProvider } from './drawer';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <AuthProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </AuthProvider>
  </ToastProvider>
);

export default AppProvider;
