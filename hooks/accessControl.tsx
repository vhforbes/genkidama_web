import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from './toast';
import { useLoader } from './loader';

import { User } from '../interfaces/User';

import privateApi from '../services/privateApi';
import routes from '../enums/routes';

interface AccessControlState {
  id: string;
  hasFullAccess: boolean;
  hasLimitedAccess: boolean;
}

interface AccessControlContextData {
  currentAccess: AccessControlState;
  getUserAccess(): Promise<void>;
  checkFullAccess(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AccessControlContext = createContext<AccessControlContextData>(
  {} as AccessControlContextData,
);

// Idealmente, logica no back, mas eu posso temporariamente, obter o usuario, e organizar seus dados
// e deixar seu accessControl organizado e funcional. Porém precisa ir para o back no futuro,
// principalmente, pensando em usar um redis como cache

const AccessControlProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const router = useRouter();

  const [currentAccess, setCurrentAccess] = useState<AccessControlState>(
    {} as AccessControlState,
  );

  const getUserAccess = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await privateApi.get(routes.users);
      const user = data.user as User;

      const accessControl = {
        id: user.id,
        hasFullAccess: false,
        hasLimitedAccess: false,
      } as AccessControlState;

      if (user.subscription?.status === 'ACTIVE') {
        accessControl.hasFullAccess = true;
      }

      if (user.role === 'ADMIN' || user.role === 'MEMBER') {
        accessControl.hasFullAccess = true;
      }

      if (user.role === 'BITGET') {
        accessControl.hasLimitedAccess = true;
      }

      setCurrentAccess(accessControl);
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi verificar as permissões do seu usuário',
      });
    }
  }, []);

  const checkFullAccess = useCallback(async () => {
    setLoading(true);

    await getUserAccess();

    if (!currentAccess.hasFullAccess) router.push('/sem-acesso');
    setLoading(false);
  }, []);

  return (
    <AccessControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentAccess,
        getUserAccess,
        checkFullAccess,
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};

const useAccessControl = (): AccessControlContextData => {
  const context = useContext(AccessControlContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AccessControlProvider, useAccessControl };
