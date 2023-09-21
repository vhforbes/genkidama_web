import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../../../hooks/accessControl';
import { useTradeOperations } from '../../../../hooks/tradeOperations/tradeOperations';

const UsersList: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const { getAllTradeOperations, tradeOperations } = useTradeOperations();

  useEffect(() => {
    checkAdmin();
    getAllTradeOperations();
  }, []);

  if (tradeOperations.length === 0) return null;

  return (
    <div>
      <h1 className="mt-20 text-3xl text-center mb-8">Controle de operações</h1>
      <div className="flex justify-around mb-8">
        <p>Total de operações: {tradeOperations.length}</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object?.keys(tradeOperations[0]).map(key => (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={key}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tradeOperations.map(operation => (
            <tr className="hover:bg-primary-focus" key={operation.id}>
              {Object.values(operation).map(value => (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  key={operation.id}
                >
                  {value !== null ? value.toString() : 'null'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
