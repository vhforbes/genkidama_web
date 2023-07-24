import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../../hooks/accessControl';
import { useUsersControl } from '../../../hooks/usersControl';

const MestreKame: NextPage = () => {
  const router = useRouter();
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

  const goToEditUserPage = (userId: string) => {
    console.log(userId);
    router.push(`/admin/users-control/edit-user/${userId}`);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mt-20 text-3xl text-center mb-8">Controle de acesso</h1>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersList.map(user => (
                  <tr
                    key={user.id}
                    className="hover:cursor-pointer hover:bg-primary-focus"
                    onClick={() => goToEditUserPage(user.id)}
                  >
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
                      {user.subscription?.status || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.type || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.subscription?.current_period_end || 'NA'}
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
