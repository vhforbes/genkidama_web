import { NextPage } from 'next';
import React, { useEffect } from 'react';
import TradeOperationsContainer from '../../components/tradeOperations/tradeOperationsContainer';
import { useAccessControl } from '../../hooks/accessControl';

const Operations: NextPage = () => {
  const { checkLimitedAccess } = useAccessControl();

  useEffect(() => {
    checkLimitedAccess();
  }, []);

  return (
    <div>
      <p className="text-center text-4xl font-bold mt-10">Operações</p>
      <div className="">
        <TradeOperationsContainer />
      </div>
    </div>
  );
};

export default Operations;
