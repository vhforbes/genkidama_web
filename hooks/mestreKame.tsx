import React, { createContext, useCallback, useContext } from 'react';
import { AxiosError } from 'axios';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import privateApi from '../services/privateApi';
import { ErrorResponse } from '../interfaces/ErrorResponse';

interface MestreKameContextData {
  broadcastMessage(sendMessageRequest: SendMessageRequest): void;
}

interface Props {
  children: React.ReactNode;
}

interface SendMessageRequest {
  message: string;
  image: File;
  toGroup: boolean;
  toUsers: boolean;
}

const MestreKameContext = createContext<MestreKameContextData>(
  {} as MestreKameContextData,
);

const MestreKameProvider = ({ children }: Props) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const broadcastMessage = useCallback(
    async ({ message, image, toGroup, toUsers }: SendMessageRequest) => {
      const formData = new FormData();
      formData.append('image', image);

      try {
        setLoading(true);

        if (toGroup) {
          await privateApi.post(`${routes.mestreKame}/broadcastToGroup`, {
            message,
          });

          await privateApi.post(
            `${routes.mestreKame}/broadcastImageToGroup`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        }

        if (toUsers) {
          await privateApi.post(`${routes.mestreKame}/broadcastToMembers`, {
            message,
          });

          await privateApi.post(
            `${routes.mestreKame}/broadcastImageToMembers`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Mensagem enviada',
        });
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível enviar mensagem',
        });
      }

      setLoading(false);
    },
    [],
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MestreKameContext.Provider value={{ broadcastMessage }}>
      {children}
    </MestreKameContext.Provider>
  );
};

const useMestreKame = () => {
  const context = useContext(MestreKameContext);

  if (!context) {
    throw new Error('useMestreKame must be used within an AuthProvider');
  }

  return context;
};

export { MestreKameProvider, useMestreKame };
