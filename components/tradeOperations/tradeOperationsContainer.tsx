import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import { useTradeOperations } from '../../hooks/tradeOperations';
import TradeOperationCard from './tradeOperationCard';

const TradeOperationsContainer = ({ editable }: { editable: boolean }) => {
  const { tradeOperations, getTradeOperations } = useTradeOperations();
  const { currentAccess } = useAccessControl();

  useEffect(() => {
    if (currentAccess.hasLimitedAccess) {
      getTradeOperations();
    }
  }, [currentAccess]);

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
