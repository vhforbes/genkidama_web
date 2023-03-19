import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import EditTradeOperation from '../../../../components/tradeOperations/tradeOperationForm';
import { useAccessControl } from '../../../../hooks/accessControl';

const EditOperationPage: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);
  return (
    <main className="">
      <h1 className="text-center mt-20">Editar Operação</h1>
      <EditTradeOperation edit />
    </main>
  );
};

export default EditOperationPage;
