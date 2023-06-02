import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useAccessControl } from '../../../hooks/accessControl';
import { useUsersControl } from '../../../hooks/usersControl';

const MestreKame: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const [email, setEmail] = useState('');
  const { setMember } = useUsersControl();

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="flex flex-col m-auto items-center">
      <h1 className="mt-20 text-3xl">Controle de acesso</h1>
      <div className="flex flex-col align-middle w-1/4 mt-10">
        <p className="text-center">Email do Kakaroto:</p>
        <br />
        <input
          className="textarea textarea-bordered w-full"
          placeholder="email@email.com"
          onChange={e => setEmail(e.target.value)}
        />
        <div className="flex justify-evenly mt-10">
          <button
            disabled={!email}
            onClick={() => setMember({ email, isMember: true })}
            type="button"
            className="btn bg-green text-[#fff]"
          >
            LIBERAR
          </button>
          <button
            disabled={!email}
            onClick={() => setMember({ email, isMember: false })}
            type="button"
            className="btn btn-accent"
          >
            RETIRAR
          </button>
        </div>
      </div>
    </main>
  );
};

export default MestreKame;
