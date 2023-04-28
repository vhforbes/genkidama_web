import React from 'react';

const NoAccessCompnent = () => {
  return (
    <div className="flex flex-col items-center mt-10 p-6 md:max-w-3xl m-auto text-center">
      <h1 className="text-2xl">Você não tem acesso a esse conteudo...</h1>
      <p className="mt-10">
        Para ter acesso aos nossos sinais e lives interativas, faça a{' '}
        <a className="hover:text-lightTeal underline" href="/assinatura">
          sua assinatura completa da plataforma.
        </a>
        <br />
        <br />
        <p>
          Para ter acesso aos vídeos exclusivos e lives gravadas, seja um{' '}
          <a className="hover:text-lightTeal underline" href="/parceiro-bitget">
            parceiro bitget
          </a>
        </p>
      </p>
    </div>
  );
};

export default NoAccessCompnent;
