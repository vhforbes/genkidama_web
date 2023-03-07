import React, { useEffect } from 'react';

const NoFullAccessCompnent = () => {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center mt-10 p-6">
      <h1 className="text-2xl">Você não tem acesso a essa página...</h1>
      <p className="mt-10">
        Para ter acesso a todas as funcionalidades da plataforma.{' '}
        <a className="hover:text-accent underline" href="/assinatura">
          Assine aqui
        </a>{' '}
      </p>
    </div>
  );
};

export default NoFullAccessCompnent;
