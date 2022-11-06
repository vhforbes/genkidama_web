/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDrawer } from '../../hooks/drawer';

const Drawer = () => {
  const { open, openClose } = useDrawer();
  const [zIndex, setZIndex] = useState('');

  // Await a little so the drawer wont go behind immediatly
  useEffect(() => {
    if (open) {
      setZIndex('z-10');
    } else {
      setTimeout(() => setZIndex(''), 1000);
    }
  }, [open]);

  return (
    <div className={`drawer fixed ${zIndex} hidden`}>
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
