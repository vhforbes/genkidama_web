import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import initialOptions from '../configs/paypal';

import { AuthProvider } from './auth';
import { DrawerProvider } from './drawer';
import { LoaderProvider } from './loader';
import { ToastProvider } from './toast';
import { SubscriptionProvider } from './subscription';
import { TradeOperationsProvider } from './tradeOperations';
import { AccessControlProvider } from './accessControl';
import { ExclusiveVideosProvider } from './exclusiveVideos';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <LoaderProvider>
      <AuthProvider>
        <DrawerProvider>
          <SubscriptionProvider>
            <AccessControlProvider>
              <ExclusiveVideosProvider>
                <PayPalScriptProvider options={initialOptions}>
                  <TradeOperationsProvider>{children}</TradeOperationsProvider>
                </PayPalScriptProvider>
              </ExclusiveVideosProvider>
            </AccessControlProvider>
          </SubscriptionProvider>
        </DrawerProvider>
      </AuthProvider>
    </LoaderProvider>
  </ToastProvider>
);

export default AppProvider;
