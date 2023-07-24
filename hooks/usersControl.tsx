import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import privateApi from '../services/privateApi';
import { ErrorResponse } from '../interfaces/ErrorResponse';
import { User } from '../interfaces/User';

interface UsersControlContextData {
  setMember(setMemberRequest: SetMemberRequest): void;
  getUsersList(): Promise<void>;
  getUserFromId(userId: string): Promise<User | null>;
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

  return (
    <UsersControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ setMember, getUsersList, getUserFromId, usersList, userToEdit }}
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
