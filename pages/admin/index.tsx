import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';

const Admin: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="flex flex-col items-center max-w-4xl m-auto">
      <h1 className="text-center mt-10 text-3xl">Pagina administador</h1>
      <br />
      <a className="btn btn-secondary w-1/2" href="/admin/operations">
        Operações
      </a>
      <br />
      <a className="btn btn-secondary w-1/2" href="/admin/exclusive-video">
        Vídeos Exclusivos
      </a>
      <br />
      <a className="btn btn-secondary w-1/2" href="/admin/bitget-associated">
        Atualizar associados
      </a>
    </main>
  );
};

export default Admin;
