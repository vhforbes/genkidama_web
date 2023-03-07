import type { NextPage } from 'next';
import React from 'react';

const Admin: NextPage = () => {
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
    </main>
  );
};

export default Admin;
