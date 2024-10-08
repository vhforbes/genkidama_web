import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../../../hooks/accessControl';
import { useUsersControl } from '../../../../hooks/usersControl';
import SubscriptionFormComponent from '../../../../components/usersControl/subscriptionFormComponent';

const CreateSubsriptionPage: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const router = useRouter();
  const { getUserFromId, userToEdit } = useUsersControl();

  const { id } = router.query;

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (id) {
      getUserFromId(id as string);
    }
  }, [id]);

  return (
    <main className="">
      <h1 className="text-center mt-8 text-2xl">Controle de Usuarios</h1>

      <SubscriptionFormComponent
        user={userToEdit}
        subscription={userToEdit.subscription}
      />
    </main>
  );
};

export default CreateSubsriptionPage;
