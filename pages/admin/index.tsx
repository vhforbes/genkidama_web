import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import privateApi from '../../services/privateApi';
import routes from '../../enums/routes';

const Admin: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);

  const startLive = async () => {
    await privateApi.post(routes.forms.startlive);
  };

  const closeLive = async () => {
    await privateApi.post(routes.forms.closelive);
  };

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
