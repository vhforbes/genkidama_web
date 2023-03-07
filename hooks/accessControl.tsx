import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useToast } from './toast';
import { useLoader } from './loader';

import { User } from '../interfaces/User';

import privateApi from '../services/privateApi';
import routes from '../enums/routes';

interface AccessControlState {
  id: string;
  caio: {
    hasFullAccess: boolean;
    hasLimitedAccess: boolean;
  };
}

interface AccessControlContextData {
  currentAccess: AccessControlState;
  getUserAccess(): Promise<void>;
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
  const router = useRouter();
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const [currentAccess, setCurrentAccess] = useState<AccessControlState>(
    {} as AccessControlState,
  );

  const getUserAccess = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(routes.users);
      const user = data.user as User;

      const accessControl = {
        id: user.id,
        caio: {
          hasFullAccess: false,
          hasLimitedAccess: false,
        },
      } as AccessControlState;

      if (user.subscription?.status === 'ACTIVE') {
        accessControl.caio.hasFullAccess = true;
      }

      if (user.role === 'ADMIN' || user.role === 'MEMBER') {
        accessControl.caio.hasFullAccess = true;
      }

      if (user.role === 'BITGET') {
        accessControl.caio.hasLimitedAccess = true;
      }

      setLoading(false);
      setCurrentAccess(accessControl);

      if (
        !accessControl.caio.hasFullAccess &&
        !accessControl.caio.hasLimitedAccess
      ) {
        router.push('/assinatura');
      }
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi verificar as permissões do seu usuário',
      });
    }
  }, []);

  return (
    <AccessControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentAccess,
        getUserAccess,
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
