import React, { createContext, useCallback, useMemo } from 'react';

interface AuthContextData {
  name: string;
  signIn(): void;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const signIn = useCallback(() => {
    console.log('sign in');
  }, []);

  const userContext = useMemo(() => ({ name: 'Forbes', signIn }), []);

  return (
    <AuthContext.Provider value={userContext}>{children}</AuthContext.Provider>
  );
};
