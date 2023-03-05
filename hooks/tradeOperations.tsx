import React, { createContext, useCallback, useContext, useState } from 'react';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';

interface TradeOperationState {
  id: string;
  author_id: string;
  market: string;
  active: boolean;
  direction: string;
  entry_order_one: number;
  entry_order_two: number;
  entry_order_three: number;
  take_profit_one: number;
  take_profit_two: number;
  stop: number;
  created_at: string;
  updated_at: string;
  result: string;
}

interface TradeOperationContextData {
  tradeOperations: TradeOperationState[];
  getTradeOperations(): Promise<void>;
  deleteTradeOperation(id: string): Promise<void>;
  // CRUDS FOR THE TRADE OPERATION
  //   checkSub(): Promise<void>;
  //   activateSubscription(paypalData: any): Promise<void>;
  //   cancelSubscription(
  //     cancelationReason: string,
  //     paypalSubscriptionId: string,
  //   ): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const TradeOperationsContext = createContext<TradeOperationContextData>(
  {} as TradeOperationContextData,
);

const TradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [tradeOperations, setTradeOperations] = useState<TradeOperationState[]>(
    [] as TradeOperationState[],
  );

  const getTradeOperations = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(routes.tradeOperations);

      setTradeOperations(data as TradeOperationState[]);

      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações',
      });
    }
  }, []);

  const deleteTradeOperation = useCallback(async (id: string) => {
    try {
      await privateApi.delete(`${routes.tradeOperations}/${id}`);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível deletar a operação',
      });
    }
  }, []);

  return (
    <TradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        tradeOperations,
        getTradeOperations,
        deleteTradeOperation,
      }}
    >
      {children}
    </TradeOperationsContext.Provider>
  );
};

const useTradeOperations = (): TradeOperationContextData => {
  const context = useContext(TradeOperationsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { TradeOperationsProvider, useTradeOperations };
