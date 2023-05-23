import { TradeOperation } from './TradeOperation';

export interface TradeOperationHistory {
  id: string;
  authorId: string;
  market: string;
  status: 'aguardando' | 'ativa' | 'fechada';
  direction: string;
  entryOrderOne: number;
  entryOrderTwo?: number;
  entryOrderThree?: number;
  takeProfitOne: number;
  takeProfitTwo?: number;
  stop: number;
  createdAt?: string;
  updatedAt?: string;
  result?: string;
  percentual?: number;
  version: string;
  maxFollowers: number;
  currentFollowers: number;
  tradingViewLink?: string;
  observation?: string;
  stopDistance?: string;
  tradeOperation: TradeOperation;
}
