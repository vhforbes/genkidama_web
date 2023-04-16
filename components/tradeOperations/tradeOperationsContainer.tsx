import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import { useTradeOperations } from '../../hooks/tradeOperations';
import PageButtonsComponent from '../shared/pageButtons';
import TradeOperationCard from './tradeOperationCard';

const TradeOperationsContainer = ({
  editable = false,
}: {
  editable?: boolean;
}) => {
  const {
    tradeOperations,
    getPaginatedTradeOperations,
    pagesInfo,
    setCurrentPage,
    currentPage,
  } = useTradeOperations();
  const { currentAccess } = useAccessControl();

  useEffect(() => {
    if (currentAccess.hasLimitedAccess) {
      getPaginatedTradeOperations();
    }
  }, [currentAccess, currentPage]);

  return (
    <div className="flex flex-col items-center mb-10">
      <div>
        {tradeOperations?.map(tradeOperation => (
          <TradeOperationCard
            key={tradeOperation.id}
            tradeOperation={tradeOperation}
            editable={editable}
          />
        ))}
      </div>
      <div>
        <PageButtonsComponent
          totalPages={pagesInfo.totalPages}
          changePage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TradeOperationsContainer;
