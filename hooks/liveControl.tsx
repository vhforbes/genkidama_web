import React, { createContext, useCallback, useContext } from 'react';
import { AxiosError } from 'axios';
import routes from '../enums/routes';
import { useToast } from './toast';
import { useLoader } from './loader';
import { ErrorResponse } from '../interfaces/ErrorResponse';
import privateApi from '../services/privateApi';

interface LiveControlContextData {
  startLive(): void;
  closeLive(): void;
}

interface Props {
  children: React.ReactNode;
}

const LiveControlContext = createContext<LiveControlContextData>(
  {} as LiveControlContextData,
);

const LiveControlProvider = ({ children }: Props) => {
  const { setLoading } = useLoader();
  const { addToast } = useToast();

  const startLive = useCallback(async () => {
    try {
      setLoading(true);

      await privateApi.post(routes.forms.startlive);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Alerta de live emitido!',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possivel emitir o alerta de live',
      });
    }

    setLoading(false);
  }, []);

  const closeLive = useCallback(async () => {
    try {
      setLoading(true);

      await privateApi.post(routes.forms.closelive);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Alerta de live emitido!',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possivel emitir o alerta de live',
      });
    }

    setLoading(false);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LiveControlContext.Provider value={{ startLive, closeLive }}>
      {children}
    </LiveControlContext.Provider>
  );
};

const useLiveControl = () => {
  const context = useContext(LiveControlContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { LiveControlProvider, useLiveControl };
