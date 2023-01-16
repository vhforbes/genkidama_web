import React, { useEffect, useState } from 'react';
import privateApi from '../../services/privateApi';
import TradeOperationCard from './tradeOperationCard';

interface TradeOperation {
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

const TradeOperationsContainer = () => {
  const [tradeOperations, setTradeOperations] = useState<TradeOperation[]>();

  const getTradeOperations = async () => {
    const { data } = await privateApi.get('/trade-operations');
    setTradeOperations(data);
  };

  useEffect(() => {
    getTradeOperations();
    // console.log(tradeOperations);
  }, []);

  return (
    <div>
      {tradeOperations?.map(tradeOperation => (
        <TradeOperationCard
          key={tradeOperation.id}
          tradeOperation={tradeOperation}
        />
      ))}
    </div>
  );
};

export default TradeOperationsContainer;
