import React from 'react';

import { AuthProvider } from './auth';
import { DrawerProvider } from './drawer';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ToastProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
