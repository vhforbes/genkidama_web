import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import PageButtonsComponent from '../shared/pageButtons';
import TradeOperationCard from './tradeOperationCard';
import { useActiveTradeOperations } from '../../hooks/tradeOperations/activeTradeOperations';
import { useAwaitingTradeOperations } from '../../hooks/tradeOperations/awatingTradeOperations';
import { useClosedTradeOperations } from '../../hooks/tradeOperations/closedTradeOperations';

const FilteredTradeOperationsContainer = ({
  editable = false,
}: {
  editable?: boolean;
}) => {
  const { currentAccess } = useAccessControl();

  const {
    getPaginatedAwaitingTradeOperations,
    awaitingTradeOperations,
    awaitingPagesInfo,
    setAwaitingCurrentPage,
    awaitingCurrentPage,
  } = useAwaitingTradeOperations();

  const {
    getPaginatedActiveTradeOperations,
    activeTradeOperations,
    activePagesInfo,
    setActiveCurrentPage,
    activeCurrentPage,
  } = useActiveTradeOperations();

  const {
    getPaginatedClosedTradeOperations,
    closedTradeOperations,
    closedPagesInfo,
    setClosedCurrentPage,
    closedCurrentPage,
  } = useClosedTradeOperations();

  // Refresh if page changes
  useEffect(() => {
    if (currentAccess.hasLimitedAccess) {
      getPaginatedActiveTradeOperations();
      getPaginatedAwaitingTradeOperations();
      getPaginatedClosedTradeOperations();
    }
  }, [
    currentAccess,
    activeCurrentPage,
    awaitingCurrentPage,
    closedCurrentPage,
  ]);

  return (
    <div className="flex md:flex-row flex-col justify-around">
      <div className="aguardando flex flex-col items-center mb-10 flex-1">
        <p className="text-2xl font-bold mb-8">AGUARDANDO:</p>
        <div>
          <PageButtonsComponent
            totalPages={awaitingPagesInfo.totalPages}
            changePage={setAwaitingCurrentPage}
            currentPage={awaitingCurrentPage}
          />
        </div>
        <div className="w-full p-10">
          {awaitingTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
      </div>
      <div className="ativa flex flex-col items-center mb-10 flex-1">
        <p className="text-2xl font-bold mb-8">ATIVA:</p>
        <div>
          <PageButtonsComponent
            totalPages={activePagesInfo.totalPages}
            changePage={setActiveCurrentPage}
            currentPage={activeCurrentPage}
          />
        </div>
        <div className="w-full p-10">
          {activeTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
      </div>
      <div className="fechada flex flex-col items-center mb-10 flex-1">
        <p className="text-2xl font-bold mb-8">FECHADA:</p>
        <div>
          <PageButtonsComponent
            totalPages={closedPagesInfo.totalPages}
            changePage={setClosedCurrentPage}
            currentPage={closedCurrentPage}
          />
        </div>
        <div className="w-full p-10">
          {closedTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredTradeOperationsContainer;
