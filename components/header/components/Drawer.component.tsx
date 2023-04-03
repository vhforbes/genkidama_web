/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import { useDrawer } from '../../../hooks/drawer';

const Drawer = () => {
  const { open, openClose } = useDrawer();
  const [hide, setHide] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      setHide('z-10');
    } else {
      setTimeout(() => setHide('hidden'), 200);
    }
  }, [open]);

  return (
    <div className={`drawer fixed ${hide}`}>
      <input
        readOnly
        checked={open}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={() => openClose()}
          onKeyDown={() => openClose()}
        />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {user?.role === 'ADMIN' ? (
            <a href="/admin" className="m-4 hover:text-accent">
              PAINEL ADMINISTRADOR
            </a>
          ) : null}
          {!user ? (
            <a
              href="/parceiro-bitget"
              className="m-4 hover:text-lightTeal font-bold"
            >
              Seja um parceiro Bitget
            </a>
          ) : null}
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/operations">Operações</a>
          </li>
          <li>
            <a href="/exclusive-videos">Vídeos Exclusivos</a>
          </li>
          <li>
            <a href="/live">Ao vivo</a>
          </li>
          <li>
            <a href="/mentoria">Mentoria</a>
          </li>
          {/* <li>
            <a href="/sobre-nos">Sobre nós</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
