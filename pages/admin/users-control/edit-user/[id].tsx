import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../../../hooks/accessControl';
import { useUsersControl } from '../../../../hooks/usersControl';
import EditUserComponent from '../../../../components/usersControl/editUserComponent';

const EditUserPage: NextPage = () => {
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
      <h1 className="text-center mt-8 text-2xl">Editar Usuario</h1>
      <EditUserComponent user={userToEdit} />
    </main>
  );
};

export default EditUserPage;
