import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import publicApi from '../services/api';
import routes from '../enums/routes';
import { useToast } from './toast';

interface User {
  avatar: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  subscription_id: string;
  updated_at: string;
  verified: boolean;
  role: string;
}

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
  user?: User | null;
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
    const response = await publicApi.post(routes.sessions, { email, password });

    const { token, user, refreshToken, subscription } = response.data;

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

      await publicApi.post(routes.users, {
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
        user: data?.user as User,
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
