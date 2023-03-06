import type { NextPage } from 'next';
import React from 'react';
import TradeOperationForm from '../../../../components/tradeOperations/tradeOperationForm';

const CreateOperationPage: NextPage = () => {
  return (
    <main className="">
      <h1 className="text-center mt-20">Editar Operação</h1>
      <TradeOperationForm create />
    </main>
  );
};

export default CreateOperationPage;
