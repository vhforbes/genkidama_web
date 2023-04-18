import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import FilteredTradeOperationsContainer from '../../components/tradeOperations/filteredTradeOperationsContainer';

const Operations: NextPage = () => {
  const { checkLimitedAccess } = useAccessControl();

  useEffect(() => {
    checkLimitedAccess();
  }, []);

  return (
    <div>
      <p className="text-center text-4xl font-bold mt-10 mb-10">Operações</p>
      <FilteredTradeOperationsContainer />
    </div>
  );
};

export default Operations;
