import React, { createContext, useCallback, useContext } from 'react';
import { AxiosError } from 'axios';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import privateApi from '../services/privateApi';
import { ErrorResponse } from '../interfaces/ErrorResponse';

interface UsersControlContextData {
  setMember(setMemberRequest: SetMemberRequest): void;
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

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UsersControlContext.Provider value={{ setMember }}>
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
