import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../../hooks/accessControl';
import { useUsersControl } from '../../../hooks/usersControl';

const MestreKame: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const { getUsersList, usersList } = useUsersControl();

  useEffect(() => {
    checkAdmin();
    getUsersList();
  }, []);

  const paypalUsersCount = usersList.filter(
    user => user.subscription && user.subscription.type === 'PAYPAL',
  ).length;

  const yearlyUsersCount = usersList.filter(
    user => user.subscription && user.subscription.type === 'YEARLY',
  ).length;

  const freeUsersCount = usersList.filter(
    user =>
      user.subscription &&
      (user.subscription.type === 'BETATESTER' ||
        user.subscription.type === 'VIP'),
  ).length;

  return (
    <div className="flex flex-col">
      <h1 className="mt-20 text-3xl text-center mb-8">Controle de usuários</h1>
      <div className="flex justify-around mb-8">
        <p>Total de usuários: {usersList.length}</p>
        <p>Total de subscribers PayPal: {paypalUsersCount}</p>
        <p>Total de subscribers anual: {yearlyUsersCount}</p>
        <p>Total de subscribers FREE: {freeUsersCount}</p>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subscription Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subscription Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subscription End
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {' '}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersList.map(user => (
                  <tr key={user.id} className="hover:bg-primary-focus">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.bitgetUID}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.status ? (
                        user.subscription?.status
                      ) : (
                        <Link
                          href={`/admin/users-control/create-subscription/${user.id}`}
                        >
                          <button
                            type="button"
                            className="bg-secondary px-4 h-6 rounded-md hover:bg-accent"
                          >
                            CRIAR
                          </button>
                        </Link>
                      )}

                      {/* OPÇÃO DE REATIVAR SE ESTIVER CANCELADA */}
                      {user.subscription?.status !== 'ACTIVE' ? (
                        <Link
                          href={`/admin/users-control/create-subscription/${user.id}`}
                        >
                          <button
                            type="button"
                            className="bg-secondary px-4 h-6 rounded-md hover:bg-accent"
                          >
                            REATIVAR
                          </button>
                        </Link>
                      ) : null}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.type || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.current_period_end || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/admin/users-control/edit-user/${user.id}`}>
                        <button
                          type="button"
                          className="bg-secondary px-4 h-6 rounded-md hover:bg-accent"
                        >
                          EDITAR
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MestreKame;
