import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import privateApi from '../../services/privateApi';
import { useToast } from '../toast';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { TradeOperation } from '../../interfaces/TradeOperation';
import tradeStatus from '../../enums/tradeStatus';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

interface ClosedTradeOperationContextData {
  closedTradeOperations: TradeOperation[];
  closedCurrentPage: number;
  closedPagesInfo: PagesInfo;
  setClosedCurrentPage(currentPage: number): void;
  getClosedTradeOperations(): Promise<void>;
  getPaginatedClosedTradeOperations(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export interface PagesInfo {
  next: number;
  previous: number;
  totalPages: number;
}

const ClosedTradeOperationsContext =
  createContext<ClosedTradeOperationContextData>(
    {} as ClosedTradeOperationContextData,
  );

const ClosedTradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  // GENERAL
  const [closedCurrentPage, setClosedCurrentPage] = useState(1);
  const [closedPagesInfo, setClosedPagesInfo] = useState({} as PagesInfo);

  const [closedTradeOperations, setClosedTradeOperations] = useState<
    TradeOperation[]
  >([] as TradeOperation[]);

  const getClosedTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations);

      setClosedTradeOperations(data as TradeOperation[]);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter as operações: fechadas',
      });
    }
    setLoading(false);
  }, []);

  const getPaginatedClosedTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations, {
        params: {
          status: tradeStatus.closed,
          page: closedCurrentPage,
          limit: 4,
        },
      });

      setClosedTradeOperations(data.tradeOperations as TradeOperation[]);
      setClosedPagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });
      setLoading(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter as operações: fechadas',
      });
    }
  }, [closedCurrentPage]);

  return (
    <ClosedTradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        closedTradeOperations,
        closedCurrentPage,
        closedPagesInfo,
        setClosedCurrentPage,
        getClosedTradeOperations,
        getPaginatedClosedTradeOperations,
      }}
    >
      {children}
    </ClosedTradeOperationsContext.Provider>
  );
};

const useClosedTradeOperations = (): ClosedTradeOperationContextData => {
  const context = useContext(ClosedTradeOperationsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { ClosedTradeOperationsProvider, useClosedTradeOperations };
