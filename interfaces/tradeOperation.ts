export interface TradeOperation {
  id: string;
  author_id: string;
  market: string;
  active: boolean;
  direction: string;
  entry_order_one: number;
  entry_order_two: number;
  entry_order_three: number;
  take_profit_one: number;
  take_profit_two: number;
  stop: number;
  created_at: string;
  updated_at: string;
  result: string;
}
