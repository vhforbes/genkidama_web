/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDrawer } from '../../hooks/drawer';

const Drawer = () => {
  const { open, openClose } = useDrawer();

  return (
    <div className="drawer fixed z-10">
      <input
        checked={open}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <button type="button" onClick={() => openClose()}>
              X
            </button>
          </li>
          <li>
            <a href="/">Sidebar Item 1</a>
          </li>
          <li>
            <a href="/">Sidebar Item 2</a>
          </li>
        </ul>
      </div>
      {/* <button type="button">Hey</button> */}
    </div>
  );
};

export default Drawer;
