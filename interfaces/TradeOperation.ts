export interface TradeOperation {
  id: string;
  authorId: string;
  market: string;
  marketLocation: 'spot' | 'futures';
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
  riskReturnRatio?: number;
  version: string;
  maxFollowers: number;
  currentFollowers: number;
  tradingViewLink?: string;
  observation?: string;
  stopDistance?: string;
  entryOrdersStatus?: {
    entryOrderOneTriggered?: boolean;
    entryOrderTwoTriggered?: boolean;
    entryOrderThreeTriggered?: boolean;
  };
  takeProfitStatus?: {
    takeProfitOneTriggered?: boolean;
    takeProfitTwoTriggered?: boolean;
    takeProfitThreeTriggered?: boolean;
  };

  // USED IN THE HISTORY MODEL
  tradeOperation: TradeOperation;
}
