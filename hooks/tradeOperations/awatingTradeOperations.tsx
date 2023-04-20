import React, { createContext, useCallback, useContext, useState } from 'react';
import privateApi from '../../services/privateApi';
import { useToast } from '../toast';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { TradeOperation } from '../../interfaces/TradeOperation';
import tradeStatus from '../../enums/tradeStatus';

interface AwaitingTradeOperationContextData {
  awaitingTradeOperations: TradeOperation[];
  awaitingCurrentPage: number;
  awaitingPagesInfo: PagesInfo;
  setAwaitingCurrentPage(currentPage: number): void;
  getAwaitingTradeOperations(): Promise<void>;
  getPaginatedAwaitingTradeOperations(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export interface PagesInfo {
  next: number;
  previous: number;
  totalPages: number;
}

const AwaitingTradeOperationsContext =
  createContext<AwaitingTradeOperationContextData>(
    {} as AwaitingTradeOperationContextData,
  );

const AwaitingTradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  // GENERAL
  const [awaitingCurrentPage, setAwaitingCurrentPage] = useState(1);
  const [awaitingPagesInfo, setAwaitingPagesInfo] = useState({} as PagesInfo);

  const [awaitingTradeOperations, setAwaitingTradeOperations] = useState<
    TradeOperation[]
  >([] as TradeOperation[]);

  const getAwaitingTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations);

      setAwaitingTradeOperations(data as TradeOperation[]);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter toadas as operações ativas',
      });
    }
    setLoading(false);
  }, []);

  const getPaginatedAwaitingTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations, {
        params: {
          status: tradeStatus.awaiting,
          page: awaitingCurrentPage,
          limit: 4,
        },
      });

      setAwaitingTradeOperations(data.tradeOperations as TradeOperation[]);
      setAwaitingPagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações ativas',
      });
    }
  }, [awaitingCurrentPage]);

  return (
    <AwaitingTradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        awaitingTradeOperations,
        awaitingCurrentPage,
        awaitingPagesInfo,
        setAwaitingCurrentPage,
        getAwaitingTradeOperations,
        getPaginatedAwaitingTradeOperations,
      }}
    >
      {children}
    </AwaitingTradeOperationsContext.Provider>
  );
};

const useAwaitingTradeOperations = (): AwaitingTradeOperationContextData => {
  const context = useContext(AwaitingTradeOperationsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AwaitingTradeOperationsProvider, useAwaitingTradeOperations };
