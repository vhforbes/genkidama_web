import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import publicApi from '../services/api';
import routes from '../enums/routes';
import { useToast } from './toast';
import { User } from '../interfaces/User';
import privateApi from '../services/privateApi';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  name: string;
  password: string;
  confirmedPassword: string;
  bitgetUID?: string;
}

interface AuthContextData {
  user?: User | null;
  token?: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
  refreshUser(): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const router = useRouter();

  // Set the auth data if it already exists or start it as null
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Genkidama:token');
    const user = localStorage.getItem('@Genkidama:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await publicApi.post(routes.sessions, { email, password });

    const { token, user, refreshToken, subscription } = response.data;

    if (!user.verified) {
      addToast({
        type: 'error',
        title: 'Por favor verifique seu email',
        description:
          'Caso não tenha recebido o email de confirmação, entre em contato com nossa equipe.',
      });
      return;
    }

    localStorage.setItem('@Genkidama:token', token);
    localStorage.setItem('@Genkidama:refreshToken', refreshToken);
    localStorage.setItem('@Genkidama:user', JSON.stringify(user));
    localStorage.setItem(
      '@Genkidama:subscription',
      JSON.stringify(subscription),
    );

    setData({ token, user });

    router.push('/');
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Genkidama:token');
    localStorage.removeItem('@Genkidama:user');

    setData({} as AuthState);
    router.push('/sign-in');
  }, []);

  const signUp = useCallback(
    async ({
      email,
      password,
      confirmedPassword,
      name,
      bitgetUID,
    }: SignUpCredentials) => {
      if (password !== confirmedPassword) {
        addToast({
          title: 'Passwords don`t match',
          type: 'error',
        });

        return;
      }

      await publicApi.post(routes.users, {
        email,
        name,
        password,
        bitgetUID,
      });

      router.push('/sign-in');
    },
    [],
  );

  const refreshUser = useCallback(async () => {
    const response = await privateApi.get(routes.users);

    const { token, user, subscription } = response.data;

    localStorage.setItem('@Genkidama:user', JSON.stringify(user));
    localStorage.setItem(
      '@Genkidama:subscription',
      JSON.stringify(subscription),
    );

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user: data?.user as User,
        token: data?.token,
        signIn,
        signOut,
        signUp,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
