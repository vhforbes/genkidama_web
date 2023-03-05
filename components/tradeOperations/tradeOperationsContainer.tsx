import React, { useEffect } from 'react';
import { useTradeOperations } from '../../hooks/tradeOperations';
import TradeOperationCard from './tradeOperationCard';

const TradeOperationsContainer = ({ editable }: { editable: boolean }) => {
  const { getTradeOperations, tradeOperations } = useTradeOperations();

  useEffect(() => {
    getTradeOperations();
  }, []);

  return (
    <div>
      {tradeOperations?.map(tradeOperation => (
        <TradeOperationCard
          key={tradeOperation.id}
          tradeOperation={tradeOperation}
          editable={editable}
        />
      ))}
    </div>
  );
};

export default TradeOperationsContainer;
