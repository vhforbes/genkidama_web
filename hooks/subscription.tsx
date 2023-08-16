import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import { useAuth } from './auth';
import routes from '../enums/routes';
import { ErrorResponse } from '../interfaces/ErrorResponse';

interface SubscriptionState {
  id: string;
  user_id: string;
  status: string;
  paypal_subscription_id: string;
  plan_id: string;
  current_period_start: string;
  current_period_end: string;
  canceled_at: string;
  cancelation_reason: 'It is no gud';
}

interface SubscriptionContextData {
  subscription: SubscriptionState;
  checkSub(): Promise<void>;
  activateSubscription(paypalData: any): Promise<void>;
  cancelSubscription(
    cancelationReason: string,
    paypalSubscriptionId: string,
  ): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const SubscriptionContext = createContext<SubscriptionContextData>(
  {} as SubscriptionContextData,
);

const SubscriptionProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const { user } = useAuth();
  const [subscription, subscriptionData] = useState<SubscriptionState>(
    {} as SubscriptionState,
  );

  const checkSub = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await privateApi.get('/subscriptions/status');

      setLoading(false);

      subscriptionData(data as SubscriptionState);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      console.log(e.response?.data.message);
    }
  }, []);

  const activateSubscription = useCallback(async (paypalData: any) => {
    try {
      setLoading(true);
      const { data } = await privateApi.post(
        `${routes.subscriptions}/createPayapalSubscription`,
        {
          email: user?.email,
          subscriptionID: paypalData.subscriptionID,
        },
      );

      addToast({
        type: 'success',
        description: 'Seja bem-vindo!',
        title: 'Você acaba de se tornar um Membro Genkidama!',
      });

      subscriptionData(data as SubscriptionState);
      localStorage.setItem('@Genkidama:subscription', JSON.stringify(data));

      router.push('/');
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível ativar sua assinatura',
      });
    }

    setLoading(false);
  }, []);

  const cancelSubscription = useCallback(
    async (cancelationReason: string, paypalSubscriptionId: string) => {
      try {
        setLoading(true);
        const { data } = await privateApi.post(
          `${routes.subscriptions}/cancel`,
          {
            paypalSubscriptionId,
            cancelationReason,
          },
        );

        addToast({
          type: 'success',
          description: 'Você cancelou sua assinatura com sucesso!',
          title: 'Vamos sentia sua falta...',
        });

        subscriptionData(data as SubscriptionState);
        localStorage.setItem('@Genkidama:subscription', JSON.stringify(data));

        router.push('/');
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível cancelar sua assinatura',
        });
      }

      setLoading(false);
    },
    [],
  );

  return (
    <SubscriptionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        subscription,
        checkSub,
        activateSubscription,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = (): SubscriptionContextData => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { SubscriptionProvider, useSubscription };
