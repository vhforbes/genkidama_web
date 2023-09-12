import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from './toast';
import { useLoader } from './loader';
import routes from '../enums/routes';
import privateApi from '../services/privateApi';
import { ErrorResponse } from '../interfaces/ErrorResponse';

interface XdecowContextData {
  getData(): void;
  xdecowData: XdecowResponse;
}

interface Props {
  children: React.ReactNode;
}

interface XdecowResponse {
  symbol: string;
  mv_15_xmean: number;
  oi_60_delta: number;
  funding_rate: number;
}

const XdecowContext = createContext<XdecowContextData>({} as XdecowContextData);

const XdecowProvider = ({ children }: Props) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [xdecowData, setXdecowData] = useState({} as XdecowResponse);

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await privateApi.get(`${routes.xdecow}`);

      setXdecowData(response.data);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;
      console.error(e);
    }

    setLoading(false);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <XdecowContext.Provider value={{ getData, xdecowData }}>
      {children}
    </XdecowContext.Provider>
  );
};

const useXdecow = () => {
  const context = useContext(XdecowContext);

  if (!context) {
    throw new Error('useXdecow must be used within an AuthProvider');
  }

  return context;
};

export { XdecowProvider, useXdecow };
