import React, { createContext, useContext, useState } from 'react';

interface LoaderContextData {
  isLoading: boolean;
  setLoading(loading: boolean): void;
}

interface Props {
  children: React.ReactNode;
}

const LoaderContext = createContext<LoaderContextData>({} as LoaderContextData);

const LoaderProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { LoaderProvider, useLoader };
