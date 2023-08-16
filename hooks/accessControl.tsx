import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useLoader } from './loader';

import { User } from '../interfaces/User';

import privateApi from '../services/privateApi';
import routes from '../enums/routes';
import { ErrorResponse } from '../interfaces/ErrorResponse';

interface AccessControlState {
  id: string;
  hasFullAccess: boolean;
  hasLimitedAccess: boolean;
  isAdmin: boolean;
}

interface AccessControlContextData {
  currentAccess: AccessControlState;
  getUserAccess(): Promise<AccessControlState>;
  checkFullAccess(): Promise<void>;
  checkLimitedAccess(): Promise<void>;
  checkAdmin(): Promise<void>;
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
  const { setLoading } = useLoader();
  const router = useRouter();

  const [currentAccess, setCurrentAccess] = useState<AccessControlState>(
    {} as AccessControlState,
  );

  const getUserAccess = useCallback(async () => {
    setLoading(true);

    const accessControl = {
      id: '',
      hasFullAccess: false,
      hasLimitedAccess: false,
      isAdmin: false,
    } as AccessControlState;

    try {
      const { data } = await privateApi.get(routes.users);
      const user = data.user as User;

      accessControl.id = user.id;

      if (user.subscription?.status === 'ACTIVE') {
        accessControl.hasFullAccess = true;
        accessControl.hasLimitedAccess = true;
      }

      if (user.role === 'ADMIN') {
        accessControl.isAdmin = true;
      }

      if (
        user.role === 'ADMIN' ||
        user.role === 'MEMBER' ||
        user.subscription?.status === 'ACTIVE'
      ) {
        accessControl.hasFullAccess = true;
        accessControl.hasLimitedAccess = true;
      }

      if (user.bitgetPartner) {
        accessControl.hasLimitedAccess = true;
      }

      setCurrentAccess(accessControl);
      setLoading(false);

      return accessControl;
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      console.error(e.response?.data.message);

      return accessControl;
    }
  }, []);

  const checkFullAccess = useCallback(async () => {
    setLoading(true);

    const accessControl = await getUserAccess();

    if (!accessControl.hasFullAccess) router.push('/assinatura');
    setLoading(false);
  }, []);

  const checkLimitedAccess = useCallback(async () => {
    setLoading(true);

    const accessControl = await getUserAccess();

    if (!accessControl.hasLimitedAccess && !accessControl.hasFullAccess)
      router.push('/sem-acesso');
    setLoading(false);
  }, []);

  const checkAdmin = useCallback(async () => {
    setLoading(true);

    const accessControl = await getUserAccess();

    if (!accessControl.isAdmin) router.push('/');
    setLoading(false);
  }, []);

  return (
    <AccessControlContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentAccess,
        getUserAccess,
        checkFullAccess,
        checkLimitedAccess,
        checkAdmin,
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
