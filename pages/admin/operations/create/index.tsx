import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import TradeOperationForm from '../../../../components/tradeOperations/tradeOperationForm';
import { useAccessControl } from '../../../../hooks/accessControl';

const CreateOperationPage: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="">
      <h1 className="text-center mt-20 text-2xl">Criar Operação</h1>
      <TradeOperationForm create />
    </main>
  );
};

export default CreateOperationPage;
