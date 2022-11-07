import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import routes from '../enums/routes';
import { useToast } from './toast';

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
}

interface AuthContextData {
  user?: object | null;
  token?: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
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
    const response = await api().post(routes.sessions, { email, password });

    const { token, user, refreshToken } = response.data;

    localStorage.setItem('@Genkidama:token', token);
    localStorage.setItem('@Genkidama:refreshToken', refreshToken);
    localStorage.setItem('@Genkidama:user', JSON.stringify(user));

    setData({ token, user });

    router.push('/');
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Genkidama:token');
    localStorage.removeItem('@Genkidama:user');

    setData({} as AuthState);
  }, []);

  const signUp = useCallback(
    async ({ email, password, confirmedPassword, name }: SignUpCredentials) => {
      if (password !== confirmedPassword) {
        addToast({
          title: 'Passwords don`t match',
          type: 'error',
        });

        return;
      }

      await api().post(routes.users, {
        email,
        name,
        password,
      });

      router.push('/sign-in');
    },
    [],
  );

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user: data?.user,
        token: data?.token,
        signIn,
        signOut,
        signUp,
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
