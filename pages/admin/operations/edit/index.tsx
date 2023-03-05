import type { NextPage } from 'next';
import React from 'react';
import EditTradeOperation from '../../../../components/tradeOperations/tradeOperationForm';

const EditOperationPage: NextPage = () => {
  return (
    <main className="">
      <h1 className="text-center mt-20">Editar Operação</h1>
      <EditTradeOperation />
    </main>
  );
};

export default EditOperationPage;
