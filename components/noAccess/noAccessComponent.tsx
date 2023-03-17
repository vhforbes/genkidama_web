import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';

const NoAccessCompnent = () => {
  const { currentAccess } = useAccessControl();
  useEffect(() => {}, []);

  if (currentAccess?.hasLimitedAccess) {
    return <p>ops</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10 p-6 md:max-w-3xl m-auto text-center">
      <h1 className="text-2xl">Você não tem acesso a essa página...</h1>
      <p className="mt-10">
        Para ter acesso aos nossos sinais, vídeos exclusivos e desconto na
        assinatura completa da plataforma, crie uma conta na bitget com nosso{' '}
        <a
          className="hover:text-accent underline"
          href="https://partner.bitget.com/bg/GENKIDAMA"
          rel="noreferrer"
          target="_blank"
        >
          link de parceiro.
        </a>{' '}
        Caso você ja tenha criado sua conta com nosso link, veja como obter
        acesso aos seus benefícios{' '}
        <a className="hover:text-accent underline" href="/parceria-bitget">
          clicando aqui
        </a>
      </p>
      <p className="mt-10">OU</p>
      <p className="mt-10">
        Se você não tem interesse em criar uma conta na bitget, utiliza outra
        corretora ou já criou conta com outro parceito, pode{' '}
        <a className="hover:text-accent underline" href="/assinatura">
          assinar aqui.
        </a>
      </p>
    </div>
  );
};

export default NoAccessCompnent;
