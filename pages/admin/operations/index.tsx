import type { NextPage } from 'next';
import React from 'react';
import TradeOperationsContainer from '../../../components/tradeOperations/tradeOperationsContainer';

const Admin: NextPage = () => {
  return (
    <main className="">
      <h1 className="text-center mt-20">Criar Operaçao</h1>
      <h1 className="text-center mt-20">Editar Operações</h1>
      <TradeOperationsContainer editable />
    </main>
  );
};

export default Admin;
