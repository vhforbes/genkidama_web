import type { NextPage } from 'next';
import React from 'react';

const Admin: NextPage = () => {
  return (
    <main className="flex flex-col align-center">
      <h1 className="text-center mt-20 text-3xl">Pagina administador</h1>
      <br />
      <a href="/admin/operations">Operações</a>
      <br />
      <a href="/admin/videos">Postagem Video</a>
    </main>
  );
};

export default Admin;
