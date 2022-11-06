import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user?: object | null;
  token?: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
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
    const response = await api().post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@Genkidama:token', token);
    localStorage.setItem('@Genkidama:user', JSON.stringify(user));

    setData({ token, user });

    router.push('/');
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Genkidama:token');
    localStorage.removeItem('@Genkidama:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ user: data?.user, token: data?.token, signIn, signOut }}
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
