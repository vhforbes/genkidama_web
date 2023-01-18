import type { NextPage } from 'next';
import React from 'react';
import MentoriaForm from '../../components/mentoriaForm/mentoriaForm';

const Mentoria: NextPage = () => {
  return (
    <main className="flex flex-col justify-center md:w-3/5 m-auto font-bold">
      <h1 className="text-center mt-6 md:mt-20 text-3xl md:text-6xl leading-snug max-w-5xl self-center font-extrabold">
        Programa Genkidama de Mentoria Personalizada para Traders
      </h1>
      <div className="flex flex-col p-8 md:p-14 md:mt-14 justify-center">
        <div className="flex flex-col md:flex-row align-middle justify-between">
          <img
            src="/comendobitcoin.png"
            alt="caio comendo bitcoin"
            className="max-w-sm md:mr-10"
          />
          <div className="mt-12 text-lg max-w-2xl">
            <p className="font-bold text-3xl mb-5">
              Oi, eu sou o Caio Agusto:{' '}
            </p>
            <p>
              Conheça seu mentor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem
              ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
              lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
              dolor lorem ipsum dolor lorem ipsum dolor
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6 md:mt-14">
          <p className="text-5xl font-extrabold z-1 ml-12 relative top-4">
            Objetivo
          </p>
          <div className="bg-[#22d3ee]/80 p-10 rounded-lg text-zinc900 text-xl">
            <p>
              Esse projeto com como objetivo encurtar o caminho até a
              profissionalização de um trader, nós da Genkidama entendemos que o
              perfil de cada trader e seu nivel de conhecimento devem ser
              rastreados e mapeados para um trabalho de mentoria ideal. Buscamos
              suas virtues e fraquezas com o objetivo de potencializar seus
              pontos fortes e traçar um plano de melhora contínua para seus
              pontos de melhoria.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6 md:mt-14">
          <p className="text-5xl self-end font-extrabold z-1 mr-12 relative top-4">
            Processo
          </p>
          <div className="bg-[#22d3ee]/80 p-10 rounded-lg text-zinc900 text-xl">
            <p>
              O processo de mentoria irá acontecer uma vez por semana, por 2 ou
              3 horas. Tudo será gravado para que você possa refletir sobre suas
              operações e continuar evoluindo. Após cada aula iremos colcoar
              métricas a serem seguidas para o próximo encontro, por exemplo:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Anotar todas as operações</li>
              <li>Ajustar tamanho das posições</li>
              <li>Deixar operações correrem</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col mt-6 md:mt-14 w-full self-center justify-center text-center m-auto">
          <p className="text-3xl md:text-6xl font-extrabold z-10 text-lightTeal bg-deepBlue rounded-xl md:p-8 p-6 md:mt-10">
            Voe mais longe!
          </p>
          <div className="text-2xl mt-6 md:px-32">
            <p>
              Além de passar indicadores e montar um trade system que se adapte
              ao seu perfil, vamos lado alado alinhar seu horário de trabalho,
              seu setup de operações e tudo exatamente de acordo com o estudo do
              seu perfil como trader.
            </p>
            <p>
              Aprenda com nossos erros e seus próprios.
              <br />
              <br />
              <span className="text-orange font-extrabold text-4xl">
                Juntos, voamos mais longe!
              </span>
            </p>
          </div>
        </div>

        <hr className="my-16 text-lightTeal" />

        <div className="flex flex-col items-center md:flex-row md:justify-between ">
          <div className="TEXT mr-1">
            <p className="text-2xl">
              Temas que serão abordados dentro da mentoria:
            </p>
            <ul className="list-disc ml-4 mt-4 font-normal">
              <li>Qual a sua rotina diária</li>
              <li>Entendimento de gerenciamento de risco</li>
              <li>Comprometimento com o ferenciamento de risco</li>
              <li>Noções de liquidex</li>
              <li>Gerenciamento de expectativa</li>
              <li>Desenvolvimento do trade system próprio</li>
              <li>Nível de conhecimento da análise técninca</li>
              <li>Conhecimento em análise de posicionamento?</li>
              <li>
                Comprometimento com o preenchimento do controle financeiro
                (planilha C%&LH@)
              </li>
              <li>Autoconfiança X instabilidade emocional</li>
              <li>Simplificar para operar sem sbjetividade</li>
              <li>Tirando a emoção do jogo</li>
              <li>Identificando o momento de stress</li>
              <li>Por que é importante sacar seus lucros</li>
              <li>Atividades fora do mercado, exercício físico / viagens</li>
            </ul>
          </div>
          <div className="FORM">
            <MentoriaForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mentoria;
