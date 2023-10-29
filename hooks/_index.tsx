import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import initialOptions from '../configs/paypal';

import { AuthProvider } from './auth';
import { DrawerProvider } from './drawer';
import { LoaderProvider } from './loader';
import { ToastProvider } from './toast';
import { SubscriptionProvider } from './subscription';
import { AccessControlProvider } from './accessControl';
import { ExclusiveVideosProvider } from './exclusiveVideos';
import GeneralTradeOperationsProvider from './tradeOperations/_index';
import { LiveControlProvider } from './liveControl';
import { MestreKameProvider } from './mestreKame';
import { UsersControlProvider } from './usersControl';
import { XdecowProvider } from './xdecowPannel';
import ModalAdvertisementProvider from './modalAdvertisement/modalAdvertisementProvider';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <LoaderProvider>
      <AuthProvider>
        <DrawerProvider>
          <SubscriptionProvider>
            <AccessControlProvider>
              <ExclusiveVideosProvider>
                <PayPalScriptProvider options={initialOptions}>
                  <GeneralTradeOperationsProvider>
                    <LiveControlProvider>
                      <MestreKameProvider>
                        <UsersControlProvider>
                          <XdecowProvider>
                            <ModalAdvertisementProvider>
                              {children}
                            </ModalAdvertisementProvider>
                          </XdecowProvider>
                        </UsersControlProvider>
                      </MestreKameProvider>
                    </LiveControlProvider>
                  </GeneralTradeOperationsProvider>
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
