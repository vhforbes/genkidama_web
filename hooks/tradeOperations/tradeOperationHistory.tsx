import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import privateApi from '../../services/privateApi';
import { useToast } from '../toast';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { TradeOperation } from '../../interfaces/TradeOperation';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { TradeOperationHistory } from '../../interfaces/TradeOperationHistory';

interface TradeOperationHistoryContextData {
  tradeOperationWithHistory: TradeOperationWithHistory;
  getTradeOperationHistory(id: string): Promise<void>;
}

interface TradeOperationWithHistory {
  tradeOperation: TradeOperation;
  history: TradeOperationHistory[];
}

interface Props {
  children: React.ReactNode;
}

const TradeOperationHistoryContext =
  createContext<TradeOperationHistoryContextData>(
    {} as TradeOperationHistoryContextData,
  );

const TradeOperationHistorysProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const [tradeOperationWithHistory, setTradeOperationWithHistory] =
    useState<TradeOperationWithHistory>({} as TradeOperationWithHistory);

  const getTradeOperationHistory = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(
        `${routes.tradeOperations}/history`,
        {
          params: {
            id,
          },
        },
      );

      setTradeOperationWithHistory(data);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;
      console.error(e);
      // addToast({
      //   type: 'error',
      //   description: e.response?.data.message,
      //   title: 'Não foi possível obter o histórico da operação.',
      // });
    }
    setLoading(false);
  }, []);

  return (
    <TradeOperationHistoryContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        tradeOperationWithHistory,
        getTradeOperationHistory,
      }}
    >
      {children}
    </TradeOperationHistoryContext.Provider>
  );
};

const useTradeOperationHistory = (): TradeOperationHistoryContextData => {
  const context = useContext(TradeOperationHistoryContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { TradeOperationHistorysProvider, useTradeOperationHistory };
