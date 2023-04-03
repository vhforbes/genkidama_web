import type { NextPage } from 'next';
import React from 'react';
import MentoriaForm from '../../components/mentoriaForm/mentoriaForm';

const MentoriaPage: NextPage = () => {
  return (
    <main className="flex flex-col justify-center lg:w-4/5 xxl:w-3/5 m-auto font-bold">
      <h1 className="text-center p-2 max-w-lg mt-6 lg:mt-20 text-3xl lg:text-6xl leading-snug lg:max-w-5xl self-center font-extrabold">
        Programa Genkidama de Mentoria Personalizada para Traders
      </h1>
      <div className="flex flex-col p-8 lg:p-14 lg:mt-14 justify-center">
        <div className="flex flex-col lg:flex-row self-center justify-start">
          <img
            src="/comendobitcoin.png"
            alt="caio comendo bitcoin"
            className="lg:mr-10 self-center max-w-[80%] lg:max-w-sm"
          />
          <div className="mt-12 text-lg max-w-2xl">
            <p className="font-bold text-3xl mb-5">
              Oi, eu sou o Caio Agusto:{' '}
            </p>
            <p>
              Fazem 5 anos que entrei no criptomercado, graças a ele, tive a
              oportunidade de mudar a minha vida. Foram muitos altos e baixos,
              erros e aprendizados que me fizeram crescer como trader e entender
              cada vez melhor esse mercado.
              <br />
              Hoje, busco retribuir ensinando pessoas a se tornarem traders
              lucrativos em um mercado onde a cada esquina encontramos golpes,
              vendedores de sonhos e ilusões.
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-6 lg:mt-14">
          <p className="text-5xl font-extrabold z-1 lg:ml-12 relative top-4 self-center lg:self-start">
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

        <div className="flex flex-col mt-6 lg:mt-14">
          <p className="text-5xl font-extrabold z-1 lg:mr-12 relative top-4 self-center lg:self-end">
            Processo
          </p>
          <div className="bg-[#22d3ee]/80 p-10 rounded-lg text-zinc900 text-xl">
            <p>
              O processo de mentoria irá acontecer uma vez por semana, por 1 ou
              2 horas durante aproximadamente 4 meses. Tudo será gravado para
              que você possa refletir sobre suas operações e continuar
              evoluindo. Após cada aula iremos colocar métricas a serem seguidas
              para o próximo encontro, por exemplo:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Anotar todas as operações</li>
              <li>Ajustar tamanho das posições</li>
              <li>Deixar operações correrem</li>
              <li>Retirar risco sempre que possível</li>
              <li>Estar atento aos gatilhos</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col mt-6 lg:mt-14 w-full self-center justify-center text-center m-auto">
          <p className="text-3xl lg:text-6xl font-extrabold z-2 text-lightTeal bg-deepBlue rounded-xl lg:p-8 p-6 lg:mt-10">
            Voe mais longe!
          </p>
          <div className="text-2xl mt-6 lg:px-32">
            <p>
              Além de passar indicadores e montar um trade system que se adapte
              ao seu perfil, vamos lado a lado alinhar seu horário de trabalho,
              seu setup de operações e tudo exatamente de acordo com o estudo do
              seu perfil como trader.
            </p>
            <br />
            <p>
              Aprenda com nossos erros e seus próprios.
              <br />
              <br />
              <span className="text-lightTeal font-extrabold text-4xl">
                Juntos, voamos mais longe!
              </span>
            </p>
          </div>
        </div>

        <hr className="my-16 text-lightTeal" />

        <div className="flex flex-col sm:flex-row lg:justify-between ">
          <div className="self-start mr-24">
            <p className="text-2xl">
              Temas que serão abordados dentro da mentoria:
            </p>
            <ul className="list-disc flex flex-col ml-6 mt-4 font-normal">
              <li className="mt-2">Qual a sua rotina diária</li>
              <li className="mt-2">Entendimento de gerenciamento de risco</li>
              <li className="mt-2">
                Comprometimento com o ferenciamento de risco
              </li>
              <li className="mt-2">Noções de liquidex</li>
              <li className="mt-2">Gerenciamento de expectativa</li>
              <li className="mt-2">Desenvolvimento do trade system próprio</li>
              <li className="mt-2">
                Nível de conhecimento da análise técninca
              </li>
              <li className="mt-2">
                Conhecimento em análise de posicionamento?
              </li>
              <li className="mt-2">
                Comprometimento com o preenchimento do controle financeiro
                (planilha C%&LH@)
              </li>
              <li className="mt-2">Autoconfiança X instabilidade emocional</li>
              <li className="mt-2">Simplificar para operar sem sbjetividade</li>
              <li className="mt-2">Tirando a emoção do jogo</li>
              <li className="mt-2">Identificando o momento de stress</li>
              <li className="mt-2">Por que é importante sacar seus lucros</li>
              <li className="mt-2">
                Atividades fora do mercado, exercício físico / viagens
              </li>
            </ul>
          </div>
          <img className="md:hidden" src="/meditando.png" alt="meditando" />
          <div className="FORM">
            <p className="text-2xl self-start mt-8 lg:mt-0">
              Preencha o formulário e entraremos em contato!
            </p>
            <MentoriaForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentoriaPage;
