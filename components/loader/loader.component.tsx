import React from 'react';
import { Triangle } from 'react-loader-spinner';
import { useLoader } from '../../hooks/loader';

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="flex justify-center items-center absolute w-full h-full z-10 dark:bg-transparent">
      <Triangle
        height="80"
        width="80"
        color="#02E5EC"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    </div>
  );
};

export default Loader;
