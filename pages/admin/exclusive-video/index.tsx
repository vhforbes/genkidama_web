import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import PostsContainerComponent from '../../../components/exclusiveVideo/exclusiveVideosContainer.component';
import { useAccessControl } from '../../../hooks/accessControl';

const Admin: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="flex flex-col items-center max-w-4xl m-auto">
      <h1 className="text-center mt-20 text-3xl">
        Gerenciamento de videos exclusivos
      </h1>

      <a
        className="btn btn-secondary w-1/2 mt-10"
        href="/admin/exclusive-video/create"
      >
        Criar Video Exclusivo
      </a>
      <div>
        <h1 className="text-center mt-20 text-3xl">Editar Video exclusivos:</h1>
        <div className="mt-16">
          <PostsContainerComponent editable />
        </div>
      </div>
    </main>
  );
};

export default Admin;
