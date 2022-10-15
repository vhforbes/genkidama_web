import React from 'react';

const SunSvg = ({ swap }: { swap: string }) => {
  return (
    <svg
      className={`${swap} stroke-neutral fill-neutral`}
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13v0Z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m19.14 19.14-.13-.13m0-14.02.13-.13-.13.13ZM4.86 19.14l.13-.13-.13.13ZM12 2.08V2v.08ZM12 22v-.08.08ZM2.08 12H2h.08ZM22 12h-.08.08ZM4.99 4.99l-.13-.13.13.13Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunSvg;
