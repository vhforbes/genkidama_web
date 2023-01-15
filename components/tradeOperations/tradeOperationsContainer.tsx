import React, { useEffect, useState } from 'react';
import privateApi from '../../services/privateApi';
import TradeOperationCard from './tradeOperationCard';

interface TradeOperation {
  id: string;
  author_id: string;
  market: string;
  active: boolean;
  direction: string;
  entry_zone_start: number;
  entry_zone_end: number;
  stop: number;
  created_at: string;
  updated_at: string;
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
