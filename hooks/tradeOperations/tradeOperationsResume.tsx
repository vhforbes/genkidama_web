import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import privateApi from '../../services/privateApi';
import { useLoader } from '../loader';
import routes from '../../enums/routes';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { useToast } from '../toast';

interface TradingResumeData {
  totalOperations: number;
  gainPercentage: number;
  lossPercentage: number;
  evenPercentage: number;
  totalProfitPercentage: number;
  totalRiskReturnRatio: number;
}

interface TradingResumeContextData {
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  getResumeData(): void;
  resumeData: TradingResumeData;
}

interface Props {
  children: React.ReactNode;
}

const TradingResumeContext = createContext<TradingResumeContextData>(
  {} as TradingResumeContextData,
);

const TradingResumeProvider = ({ children }: Props) => {
  const [period, setPeriod] = useState<number>(0);
  const [resumeData, setResumeData] = useState({} as TradingResumeData);

  const { setLoading } = useLoader();
  const { addToast } = useToast();

  const getResumeData = useCallback(async () => {
    setLoading(true);
    if (period) {
      try {
        const { data } = await privateApi.get(
          `${routes.tradeOperations}/resume`,
          {
            params: {
              period,
            },
          },
        );

        setResumeData(data as TradingResumeData);
      } catch (error: any) {
        const e: AxiosError<ErrorResponse> = error;

        addToast({
          type: 'error',
          description: e.response?.data.message,
          title: 'Não foi possível obter as operações: aguardando',
        });
      }
    }
    setLoading(false);
  }, [period]);

  return (
    <TradingResumeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ period, setPeriod, getResumeData, resumeData }}
    >
      {children}
    </TradingResumeContext.Provider>
  );
};

const useTradingResume = () => {
  const context = useContext(TradingResumeContext);

  if (!context) {
    throw new Error('useTradingResume must be used within an AuthProvider');
  }

  return context;
};

export { TradingResumeProvider, useTradingResume };
