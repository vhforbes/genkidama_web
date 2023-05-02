import { NextPage } from 'next';
import React from 'react';

const ParceriaBitget: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-10 p-6 m-auto text-center">
      <h1 className="text-3xl md:max-w-2xl">
        Graças a parceria <strong>Genkidama - Bitget</strong>, tenha acesso a
        conteúdos exclusivos e participe do crescimento dessa plataforma!
      </h1>
      <div>
        <h1 className="text-2xl mt-10 text-red font-bold">
          AINDA NÃO TENHO CONTA NA BITGET:
        </h1>
        <ul className="text-left md:max-w-xl list-disc mt-10">
          <li>
            Crie sua conta na Bitget através do nosso link de parceiro{' '}
            <a
              className="hover:text-accent underline"
              href="https://partner.bitget.com/bg/GENKIDAMA"
              target="_blank"
              rel="noreferrer"
            >
              clicando aqui.
            </a>
          </li>
          <br />
          <li>
            Deposite ao menos $10 e tenha uma conta ativa para que sua criação
            de conta seja considerada válida pela plataforma.
          </li>
          <br />
          <li>
            Toda semana atualizamos nossa lista de usuários válidos, caso queira
            agilizar o processo, mande uma mensagem no nosso{' '}
            <a
              className="hover:text-accent underline"
              href="https://t.me/genkidamaskillschat"
              target="_blank"
              rel="noreferrer"
            >
              grupo do telegram
            </a>{' '}
            com o seu UID.
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-2xl mt-10 text-lightTeal font-bold">
          JÁ CRIEI MINHA CONTA NA BITGET:
        </h1>
        <ul className="text-left md:max-w-xl list-disc mt-10">
          <li>
            Tenha certeza que você criou sua conta através do nosso{' '}
            <a
              className="hover:text-accent underline"
              href="https://partner.bitget.com/bg/GENKIDAMA"
              target="_blank"
              rel="noreferrer"
            >
              link de parceiro{' '}
            </a>
            e depositou ao menos $10 caso contrário você só terá acesso a
            plataforma{' '}
            <a className="hover:text-accent underline" href="/assinatura">
              se tornando um associado.
            </a>
            <br />
            <p className="text-xs">
              Lembre-se, é possível cancelar sua conta atual e criar uma nova
              através do nosso{' '}
              <a
                className="hover:text-accent underline"
                href="https://partner.bitget.com/bg/GENKIDAMA"
                target="_blank"
                rel="noreferrer"
              >
                link.{' '}
              </a>
              .
            </p>
          </li>
          <br />
          <li>
            Busque o seu User ID no seu{' '}
            <a
              className="hover:text-accent underline"
              href="https://www.bitget.com/dashboard"
              target="_blank"
              rel="noreferrer"
            >
              dashboard.{' '}
            </a>
          </li>
          <br />
          <li>
            <a
              href="/sign-up"
              className="hover:text-accent underline"
              target="_blank"
              rel="noreferrer"
            >
              Crie sua conta
            </a>{' '}
            na plataforma Genkidama inserido o seu UID ou se já tiver uma conta,
            atualize seu UID da Bitget na{' '}
            <a
              href="/account"
              className="hover:text-accent underline"
              target="_blank"
              rel="noreferrer"
            >
              página de usuário
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ParceriaBitget;
