import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import privateApi from '../services/privateApi';
import { ErrorResponse } from '../interfaces/ErrorResponse';
import { User } from '../interfaces/User';
import { Subscription } from '../interfaces/Subscription';

interface UsersControlContextData {
  setMember(setMemberRequest: SetMemberRequest): void;
  getUsersList(): Promise<void>;
  getUserFromId(userId: string): Promise<User | null>;
  updateUser(user: User): Promise<void>;
  updateSubscription(subscription: Subscription): Promise<void>;
  createSubscription(subscription: Subscription): Promise<void>;
  userToEdit: User;
  usersList: User[];
}

interface Props {
  children: React.ReactNode;
}

interface SetMemberRequest {
  email: string;
  isMember: boolean;
}

const UsersControlContext = createContext<UsersControlContextData>(
  {} as UsersControlContextData,
);

const UsersControlProvider = ({ children }: Props) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [usersList, setUsersList] = useState([] as User[]);
  const [userToEdit, setUserToEdit] = useState({} as User);

  const setMember = useCallback(
    async ({ email, isMember }: SetMemberRequest) => {
      try {
        setLoading(true);

        await privateApi.patch(`${routes.users}/set-member`, {
          email,
          isMember,
        });

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Membro atualizado!',
        });
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível atualiazar o usuário',
        });
      }

      setLoading(false);
    },
    [],
  );

  const getUsersList = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(`${routes.users}/list`);

      setUsersList(data.users);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter a lista de usuários',
      });
    }

    setLoading(false);
  }, []);

  const getUserFromId = useCallback(async (userId: string) => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(`${routes.users}/id/${userId}`);

      setUserToEdit(data);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter o usuário desejado',
      });
    }

    setLoading(false);
    return null;
  }, []);

  const updateUser = useCallback(async (user: User) => {
    try {
      setLoading(true);

      await privateApi.put(`${routes.users}/update/${user.id}`, user);

      addToast({
        type: 'success',
        title: 'User atualizado com sucesso!',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível atualizar o usuário desejado',
      });
    }

    setLoading(false);
  }, []);

  const updateSubscription = useCallback(async (subscription: Subscription) => {
    try {
      setLoading(true);

      await privateApi.put(
        `${routes.subscriptions}/update/${subscription.id}`,
        subscription,
      );

      addToast({
        type: 'success',
        title: 'Subscription atualizada com sucesso!',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível atualizar o usuário desejado',
      });
    }

    setLoading(false);
  }, []);

  const createSubscription = useCallback(async (subscription: Subscription) => {
    try {
      setLoading(true);

      if (subscription.type === 'PAYPAL') {
        await privateApi.post(
          `${routes.subscriptions}/createPayapalSubscription/${subscription.id}`,
          subscription,
        );
      } else {
        await privateApi.post(
          `${routes.subscriptions}/createManualSubscription/${subscription.id}`,
          subscription,
        );
      }

      addToast({
        type: 'success',
        title: 'Subscription criada com sucesso!',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter o usuário desejado',
      });
    }

    setLoading(false);
  }, []);

  return (
    <UsersControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        setMember,
        getUsersList,
        getUserFromId,
        updateUser,
        updateSubscription,
        createSubscription,
        usersList,
        userToEdit,
      }}
    >
      {children}
    </UsersControlContext.Provider>
  );
};

const useUsersControl = () => {
  const context = useContext(UsersControlContext);

  if (!context) {
    throw new Error('useUsersControl must be used within an AuthProvider');
  }

  return context;
};

export { UsersControlProvider, useUsersControl };
