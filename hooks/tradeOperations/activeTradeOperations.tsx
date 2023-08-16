import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import privateApi from '../../services/privateApi';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { TradeOperation } from '../../interfaces/TradeOperation';
import tradeStatus from '../../enums/tradeStatus';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

interface ActiveTradeOperationContextData {
  activeTradeOperations: TradeOperation[];
  activeCurrentPage: number;
  activePagesInfo: PagesInfo;
  setActiveCurrentPage(currentPage: number): void;
  getActiveTradeOperations(): Promise<void>;
  getPaginatedActiveTradeOperations(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export interface PagesInfo {
  next: number;
  previous: number;
  totalPages: number;
}

const ActiveTradeOperationsContext =
  createContext<ActiveTradeOperationContextData>(
    {} as ActiveTradeOperationContextData,
  );

const ActiveTradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { setLoading } = useLoader();

  // GENERAL
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [activePagesInfo, setActivePagesInfo] = useState({} as PagesInfo);

  const [activeTradeOperations, setActiveTradeOperations] = useState<
    TradeOperation[]
  >([] as TradeOperation[]);

  const getActiveTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations);

      setActiveTradeOperations(data as TradeOperation[]);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      console.error(e.response?.data.message);
    }
    setLoading(false);
  }, []);

  const getPaginatedActiveTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations, {
        params: {
          status: tradeStatus.active,
          page: activeCurrentPage,
          limit: 4,
        },
      });

      setActiveTradeOperations(data.tradeOperations as TradeOperation[]);
      setActivePagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });
      setLoading(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      console.error(e.response?.data.message);
    }
  }, [activeCurrentPage]);

  return (
    <ActiveTradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        activeTradeOperations,
        activeCurrentPage,
        activePagesInfo,
        setActiveCurrentPage,
        getActiveTradeOperations,
        getPaginatedActiveTradeOperations,
      }}
    >
      {children}
    </ActiveTradeOperationsContext.Provider>
  );
};

const useActiveTradeOperations = (): ActiveTradeOperationContextData => {
  const context = useContext(ActiveTradeOperationsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { ActiveTradeOperationsProvider, useActiveTradeOperations };
