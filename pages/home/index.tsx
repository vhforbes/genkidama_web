import { NextPage } from 'next';
import React from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import TradeOperationsResumeCard from '../../components/tradeOperations/tradeOperationsResumeCard';

const HomePage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="w-full m-auto md:p-12 p-4">
      <div className="flex flex-col md:flex-row justify-around">
        <div className="flex flex-col justify-center">
          <img
            className="max-w-xl md:relative md:right-4"
            alt="gnk text"
            src="/genkidama-azul.png"
          />
          <p className="md:text-4xl text-2xl font-bold md:mt-8 max-w-lg ml-4 ml:m-0">
            Seu caminho para se tornar um trader lucrativo começa agora!
          </p>
        </div>
        <div>
          <img
            className="border-8 rounded-2xl border-lightTeal max-w-2xl w-full mt-8 md:mt-0"
            src="/caio-trader.jpg"
            alt=""
          />
        </div>
      </div>

      <p className="text-center mt-8 md:mt-20 text-2xl">
        <span className="md:text-4xl font-bold  p-4">Trading sem mentiras</span>
        <br />
        <br />
        <span className="font-thin">
          Confira o resultado acumulado dos nossos sinais educativos:
        </span>
      </p>

      <div className="flex md:flex-row flex-col justify-around mt-8">
        <div className="w-80 m-auto md:m-0 border-lightTeal border-8 rounded-3xl">
          <TradeOperationsResumeCard />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-around mt-14 md:w-2/3 m-auto">
        <div className="w-full max-w-2xl h-[250px] md:h-[420px] mr-20">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/zPvkBXeObP0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="relative ml-6 mt-4 md:m-0">
          <p className="text-xl font-bold">Aqui você encontra:</p>
          <ul
            className="text-left list-disc mt-4 m-auto md:relative md:left-6
          "
          >
            <li>Uma comunidade engajada de traders maduros e experientes</li>
            <li>Sinais diários e educativos.</li>
            <li>
              Um BOT que te atualiza com novas operações e o status das suas
              operações.
            </li>
            <li>
              Lives com acesso direto a um trader com anos de experiência.
            </li>
            <li>Uma calculadora customizada para os cálculos de posição</li>
            <li>
              Mais de 8h de conteúdo gratúito para nossos{' '}
              <a
                className="hover:text-lightTeal underline font-bold"
                href="/parceiro-bitget"
              >
                Parceiros Bitget.
              </a>
            </li>
            <li>Diversas funcionalidades que estão em desenvolvimento.</li>
          </ul>
        </div>
      </div>

      <div className="text-center my-8 md:mt-20">
        <a
          href="/sign-up"
          className="m-auto text-xl md:text-3xl text-slate900 font-bold cursor-pointer hover:text-red text-center w-fit p-4 bg-lightTeal"
        >
          CRIA SUA CONTA E FAÇA PARTE
        </a>
      </div>
    </div>
  );
};

export default HomePage;
