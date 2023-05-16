import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useAccessControl } from '../../../hooks/accessControl';
import { useMestreKame } from '../../../hooks/mestreKame';

const MestreKame: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const { broadcastMessage } = useMestreKame();
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="items-center">
      <h1 className="text-center mt-20 text-3xl">Mestre Kame</h1>
      <div className="flex flex-col items-center mt-16 mx-20">
        <p>Enviar mensagem para todos</p>
        <br />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Broadcast message"
          onChange={e => setMessage(e.target.value)}
        />
        <button
          onClick={() => broadcastMessage(message)}
          type="button"
          className="btn btn-secondary mt-10"
        >
          Enviar mensagem
        </button>
      </div>
    </main>
  );
};

export default MestreKame;
