import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import FilteredTradeOperationsContainer from '../../components/tradeOperations/filteredTradeOperationsContainer';
import NoAccessCompnent from '../../components/noAccess/noAccessComponent';

const Operations: NextPage = () => {
  const { getUserAccess, currentAccess } = useAccessControl();

  useEffect(() => {
    getUserAccess();
  }, []);

  return (
    <div>
      <p className="text-center text-4xl font-bold mt-10 mb-10">Operações</p>
      {currentAccess.hasFullAccess ? (
        <FilteredTradeOperationsContainer />
      ) : (
        <NoAccessCompnent />
      )}
    </div>
  );
};

export default Operations;
