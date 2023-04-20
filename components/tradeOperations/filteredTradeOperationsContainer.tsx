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
    <div className="flex flex-col justify-around 2xl:flex-row">
      <div className="aguardando flex flex-col items-center p-4 mb-4 bg-zinc900 pt-8 bg-opacity-40 rounded-xl">
        <p className="text-2xl font-bold mb-4">AGUARDANDO:</p>
        <div>
          {awaitingTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
        <div className="mt-auto">
          <PageButtonsComponent
            totalPages={awaitingPagesInfo.totalPages}
            changePage={setAwaitingCurrentPage}
            currentPage={awaitingCurrentPage}
          />
        </div>
      </div>

      <div className="ativa flex flex-col items-center p-4 mb-4 bg-zinc900 pt-8 bg-opacity-40 rounded-xl">
        <p className="text-2xl font-bold mb-4">ATIVA:</p>
        <div className="cards-container">
          {activeTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
        <div className="mt-auto">
          <PageButtonsComponent
            totalPages={activePagesInfo.totalPages}
            changePage={setActiveCurrentPage}
            currentPage={activeCurrentPage}
          />
        </div>
      </div>

      <div className="fechada flex flex-col items-center p-4 mb-4 bg-zinc900 pt-8 bg-opacity-40 rounded-xl">
        <p className="text-2xl font-bold mb-4">FECHADA:</p>

        <div className="cards-container">
          {closedTradeOperations?.map(tradeOperation => (
            <TradeOperationCard
              key={tradeOperation.id}
              tradeOperation={tradeOperation}
              editable={editable}
            />
          ))}
        </div>
        <div className="mt-auto">
          <PageButtonsComponent
            totalPages={closedPagesInfo.totalPages}
            changePage={setClosedCurrentPage}
            currentPage={closedCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilteredTradeOperationsContainer;
