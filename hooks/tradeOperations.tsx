import React, { createContext, useCallback, useContext, useState } from 'react';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import { TradeOperation } from '../interfaces/TradeOperation';

interface TradeOperationContextData {
  tradeOperations: TradeOperation[];
  currentPage: number;
  pagesInfo: PagesInfo;
  setCurrentPage(currentPage: number): void;
  getAllTradeOperations(): Promise<void>;
  getPaginatedTradeOperations(): Promise<void>;
  deleteTradeOperation(id: string): Promise<void>;
  createTradeOperation(tradeOperation: TradeOperation): Promise<void>;
  editTradeOperation(tradeOperation: TradeOperation): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

interface PagesInfo {
  next: number;
  previous: number;
  totalPages: number;
}

const TradeOperationsContext = createContext<TradeOperationContextData>(
  {} as TradeOperationContextData,
);

const TradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesInfo, setPagesInfo] = useState({} as PagesInfo);
  const [tradeOperations, setTradeOperations] = useState<TradeOperation[]>(
    [] as TradeOperation[],
  );

  const getAllTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations);

      setTradeOperations(data as TradeOperation[]);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações',
      });
    }
    setLoading(false);
  }, []);

  const getPaginatedTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.tradeOperations, {
        params: {
          page: currentPage,
          limit: 4,
        },
      });

      setTradeOperations(data.tradeOperations as TradeOperation[]);
      setPagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações',
      });
    }
  }, [currentPage]);

  const createTradeOperation = useCallback(
    async (tradeOperation: TradeOperation) => {
      try {
        await privateApi.post(routes.tradeOperations, tradeOperation);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Operação criada com sucesso :)',
        });
      } catch (error) {
        addToast({
          type: 'error',
          description: 'Ops, tivemos um erro.',
          title: 'Não foi possível criar a operação',
        });
      }
    },
    [],
  );

  const editTradeOperation = useCallback(
    async (tradeOperation: TradeOperation) => {
      setLoading(true);
      try {
        const { data } = await privateApi.put(
          routes.tradeOperations,
          tradeOperation,
        );

        const updatedTradeOperations = tradeOperations as Array<TradeOperation>;
        updatedTradeOperations.push(data);

        setTradeOperations(updatedTradeOperations);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Operação editada com sucesso :)',
        });
      } catch (error) {
        addToast({
          type: 'error',
          description: 'Ops, tivemos um erro.',
          title: 'Não foi possível editar a operação',
        });
      }
      setLoading(false);
    },
    [],
  );

  const deleteTradeOperation = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await privateApi.delete(`${routes.tradeOperations}?id=${id}`);

      addToast({
        type: 'success',
        description: 'Operação apagada com sucess',
        title: '',
      });

      getAllTradeOperations();
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível deletar a operação',
      });
    }
    setLoading(false);
  }, []);

  return (
    <TradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        tradeOperations,
        currentPage,
        pagesInfo,
        setCurrentPage,
        getAllTradeOperations,
        getPaginatedTradeOperations,
        deleteTradeOperation,
        createTradeOperation,
        editTradeOperation,
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
