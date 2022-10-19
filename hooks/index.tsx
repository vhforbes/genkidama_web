import React from 'react';
import ToastComponent from '../components/toast/toast.component';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
