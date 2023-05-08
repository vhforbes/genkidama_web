import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import { useLiveControl } from '../../hooks/liveControl';

const Admin: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const { startLive, closeLive } = useLiveControl();

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
      <br />
      <button
        type="button"
        className="btn bg-green text-[#fff]"
        onClick={startLive}
      >
        START LIVE
      </button>
      <br />
      <button type="button" className="btn btn-accent" onClick={closeLive}>
        CLOSE LIVE
      </button>
    </main>
  );
};

export default Admin;
