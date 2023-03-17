/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useAuth } from '../../../hooks/auth';
import UserSvg from '../../../icons/misc/user';

const UserDropdownComponent = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="dropdown dropdown-end m-4">
      <label
        tabIndex={0}
        className="m-1 bg-transparent border-none cursor-pointer"
      >
        <UserSvg />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {user ? (
          <li>
            <a href="/account">Minha conta</a>
            <a href="/assinatura">Assinatura</a>
          </li>
        ) : null}

        <li>
          {user ? (
            <button type="button" onClick={signOut}>
              Sair
            </button>
          ) : (
            <a href="/sign-in">Entrar</a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownComponent;
