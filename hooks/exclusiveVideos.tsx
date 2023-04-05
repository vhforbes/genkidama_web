import React, { createContext, useCallback, useContext, useState } from 'react';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import { ExclusiveVideo } from '../interfaces/ExclusiveVideo';

interface ExclusiveVideoContextData {
  exclusiveVideos: ExclusiveVideo[];
  currentPage: number;
  pagesInfo: PagesInfo;
  setCurrentPage(currentPage: number): void;
  getAllExclusiveVideos(): Promise<void>;
  getPaginatedExclusiveVideos(): Promise<void>;
  createExclusiveVideo(exclusiveVideo: ExclusiveVideo): Promise<void>;
  editExclusiveVideo(exclusiveVideo: ExclusiveVideo): Promise<void>;
  deleteExclusiveVideo(id: string): Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

interface PagesInfo {
  next: number;
  previous: number;
  totalPages: number;
}

const ExclusiveVideosContext = createContext<ExclusiveVideoContextData>(
  {} as ExclusiveVideoContextData,
);

const ExclusiveVideosProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesInfo, setPagesInfo] = useState({} as PagesInfo);
  const [exclusiveVideos, setExclusiveVideos] = useState<ExclusiveVideo[]>(
    [] as ExclusiveVideo[],
  );

  const getAllExclusiveVideos = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await privateApi.get(routes.exclusiveVideos);

      setExclusiveVideos(data as ExclusiveVideo[]);

      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter os últimos videos',
      });
    }
  }, []);

  const getPaginatedExclusiveVideos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.exclusiveVideos, {
        params: {
          page: currentPage,
          limit: 8,
        },
      });

      setExclusiveVideos(data.exclusiveVideos as ExclusiveVideo[]);
      setPagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });

      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        description: 'Ops, tivemos um erro.',
        title: 'Não foi possível obter as operações',
      });
    }
  }, [currentPage]);

  const createExclusiveVideo = useCallback(
    async (exclusiveVideo: ExclusiveVideo) => {
      try {
        setLoading(true);

        await privateApi.post(routes.exclusiveVideos, exclusiveVideo);

        setLoading(false);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Video exclusivo criado :)',
        });
      } catch (error) {
        addToast({
          type: 'error',
          description: 'Ops, tivemos um erro.',
          title: 'Não foi possível obter os últimos videos',
        });
      }
    },
    [],
  );

  const editExclusiveVideo = useCallback(
    async (exclusiveVideo: ExclusiveVideo) => {
      try {
        setLoading(true);

        await privateApi.put(routes.exclusiveVideos, exclusiveVideo);

        setLoading(false);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Video exclusivo atualizado :)',
        });
      } catch (error) {
        addToast({
          type: 'error',
          description: 'Ops, tivemos um erro.',
          title: 'Não foi possível obter os últimos videos',
        });
      }
    },
    [],
  );

  const deleteExclusiveVideo = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await privateApi.delete(`${routes.exclusiveVideos}/${id}`);
      setLoading(false);
      addToast({
        type: 'success',
        description: 'Video apagado com sucesso',
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
        currentPage,
        pagesInfo,
        setCurrentPage,
        getAllExclusiveVideos,
        getPaginatedExclusiveVideos,
        createExclusiveVideo,
        editExclusiveVideo,
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
