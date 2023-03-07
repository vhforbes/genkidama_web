import React, { createContext, useCallback, useContext, useState } from 'react';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import { ExclusiveVideo } from '../interfaces/ExclusiveVideo';

interface ExclusiveVideoContextData {
  exclusiveVideos: ExclusiveVideo[];
  getExclusiveVideos(): Promise<void>;
  deleteExclusiveVideo(id: string): Promise<void>;
  // CRUDS FOR THE TRADE OPERATION
  //   checkSub(): Promise<void>;
  //   activateSubscription(paypalData: any): Promise<void>;
  //   cancelSubscription(
  //     cancelationReason: string,
  //     paypalSubscriptionId: string,
  //   ): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const ExclusiveVideosContext = createContext<ExclusiveVideoContextData>(
  {} as ExclusiveVideoContextData,
);

const ExclusiveVideosProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [exclusiveVideos, setExclusiveVideos] = useState<ExclusiveVideo[]>(
    [] as ExclusiveVideo[],
  );

  const getExclusiveVideos = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(routes.posts);

      setExclusiveVideos(data.response as ExclusiveVideo[]);

      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações',
      });
    }
  }, []);

  const deleteExclusiveVideo = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await privateApi.delete(`${routes.posts}/${id}`);
      setLoading(false);
      addToast({
        type: 'success',
        description: 'Operação apagada com sucess',
        title: '',
      });
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível deletar a operação',
      });
    }
  }, []);

  return (
    <ExclusiveVideosContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        exclusiveVideos,
        getExclusiveVideos,
        deleteExclusiveVideo,
      }}
    >
      {children}
    </ExclusiveVideosContext.Provider>
  );
};

const useExclusiveVideos = (): ExclusiveVideoContextData => {
  const context = useContext(ExclusiveVideosContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { ExclusiveVideosProvider, useExclusiveVideos };
