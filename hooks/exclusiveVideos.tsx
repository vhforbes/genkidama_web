import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import privateApi from '../services/privateApi';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import { ExclusiveVideo } from '../interfaces/ExclusiveVideo';
import { ErrorResponse } from '../interfaces/ErrorResponse';

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
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível excluir os vídeos',
      });
    }
  }, []);

  const getPaginatedExclusiveVideos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await privateApi.get(routes.exclusiveVideos, {
        params: {
          page: currentPage,
          limit: 5,
        },
      });

      setExclusiveVideos(data.exclusiveVideos as ExclusiveVideo[]);
      setPagesInfo({
        next: data.next as number,
        previous: data.previous as number,
        totalPages: data.totalPages as number,
      });

      setLoading(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível obter os vídeos',
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
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível criar o vídeo',
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
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível editar o vídeo',
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
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível excluir o vídeo',
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
