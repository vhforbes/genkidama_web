import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import { TradeOperation } from '../interfaces/TradeOperation';

interface TradeOperationContextData {
  tradeOperations: TradeOperation[];
  getTradeOperations(): Promise<void>;
  deleteTradeOperation(id: string): Promise<void>;
  createTradeOperation(tradeOperation: TradeOperation): Promise<void>;
  editTradeOperation(tradeOperation: TradeOperation): Promise<void>;
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
  const [tradeOperations, setTradeOperations] = useState<TradeOperation[]>(
    [] as TradeOperation[],
  );

  const getTradeOperations = useCallback(async () => {
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

      getTradeOperations();
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível deletar a operação',
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getTradeOperations();
  }, []);

  return (
    <TradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        tradeOperations,
        getTradeOperations,
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
