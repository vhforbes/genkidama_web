import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import privateApi from '../services/privateApi';

interface SubscriptionState {
  status: string;
}

interface SubscriptionContextData {
  subscription: string;
  checkSub(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const SubscriptionContext = createContext<SubscriptionContextData>(
  {} as SubscriptionContextData,
);

const SubscriptionProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<SubscriptionState>({ status: '' });
  const router = useRouter();

  const checkSub = useCallback(async () => {
    const response = await privateApi.get('/subscriptions/status');

    const { status } = response.data;

    if (status !== 'ACTIVE') {
      router.push('/seja-membro');
    }

    setData({ status });
  }, []);

  return (
    <SubscriptionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        subscription: data?.status,
        checkSub,
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
