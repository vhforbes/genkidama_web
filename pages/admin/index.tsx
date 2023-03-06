import type { NextPage } from 'next';
import React from 'react';

const Admin: NextPage = () => {
  return (
    <main className="flex flex-col items-center max-w-4xl m-auto">
      <h1 className="text-center mt-20 text-3xl">Pagina administador</h1>
      <br />
      <a className="btn btn-secondary w-full" href="/admin/operations">
        Operações
      </a>
      <br />
      <a className="btn btn-secondary w-full" href="/admin/videos">
        Postagem Video
      </a>
    </main>
  );
};

export default Admin;
