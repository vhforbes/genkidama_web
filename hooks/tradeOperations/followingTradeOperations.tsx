import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import privateApi from '../../services/privateApi';
import { useToast } from '../toast';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { TradeOperation } from '../../interfaces/TradeOperation';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

interface FollowingTradeOperationContextData {
  FollowingTradeOperations: TradeOperation[];
  getFollowingTradeOperations(): Promise<void>;
  followTradeOperation(id: string): Promise<void>;
  unFollowTradeOperation(id: string): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const FollowingTradeOperationsContext =
  createContext<FollowingTradeOperationContextData>(
    {} as FollowingTradeOperationContextData,
  );

const FollowingTradeOperationsProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const [FollowingTradeOperations, setFollowingTradeOperations] = useState<
    TradeOperation[]
  >([] as TradeOperation[]);

  const getFollowingTradeOperations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(`${routes.users}`);

      setFollowingTradeOperations(
        data.user.tradeOperations as TradeOperation[],
      );
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter toadas as operações ativas',
      });
    }
    setLoading(false);
  }, []);

  const followTradeOperation = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await privateApi.post(`${routes.tradeOperations}/follow`, {
        tradeOperationId: id,
      });

      addToast({
        type: 'success',
        description:
          'Fique de olho no seu telegram para acompanhar as atualizações!',
        title: 'Você seguiu a operação',
      });

      getFollowingTradeOperations();
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Ops, tivemos um erro.',
      });
    }
    setLoading(false);
  }, []);

  const unFollowTradeOperation = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await privateApi.post(`${routes.tradeOperations}/unfollow`, {
        tradeOperationId: id,
      });

      addToast({
        type: 'success',
        description:
          'Agora você não irá mais receber as notificações dessa operação.',
        title: 'Você abandonou a operaçao',
      });

      getFollowingTradeOperations();
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Ops, tivemos um erro.',
      });
    }
    setLoading(false);
  }, []);

  return (
    <FollowingTradeOperationsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        FollowingTradeOperations,
        getFollowingTradeOperations,
        followTradeOperation,
        unFollowTradeOperation,
      }}
    >
      {children}
    </FollowingTradeOperationsContext.Provider>
  );
};

const useFollowTradeOperations = (): FollowingTradeOperationContextData => {
  const context = useContext(FollowingTradeOperationsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { FollowingTradeOperationsProvider, useFollowTradeOperations };
