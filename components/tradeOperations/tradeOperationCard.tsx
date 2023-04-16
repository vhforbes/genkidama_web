/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useTradeOperations } from '../../hooks/tradeOperations';
import { TradeOperation } from '../../interfaces/TradeOperation';
import CopyableValue from './components/copyableValue';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  tradeOperation: TradeOperation;
  editable: boolean;
}

const ActiveTradeOperationCard = ({ tradeOperation, editable }: Props) => {
  const { deleteTradeOperation } = useTradeOperations();
  const router = useRouter();

  const {
    status,
    market,
    updatedAt,
    direction,
    entryOrderOne,
    entryOrderTwo,
    entryOrderThree,
    takeProfitOne,
    takeProfitTwo,
    stop,
    result,
    observation,
  } = tradeOperation as TradeOperation;

  const active = true;

  const [colorHex] = useState(() => {
    if (active)
      return direction.toLocaleLowerCase() === 'long' ? '#16a34a' : '#b91c1c';
    return '#6b7280';
  });

  const directionTitle = () => {
    if (direction === 'long') {
      return (
        <p className="font-bold text-2xl text-green">
          {direction.toUpperCase()}
        </p>
      );
    }

    return (
      <p className="font-bold text-2xl text-red">{direction.toUpperCase()}</p>
    );
  };

  const updatedDate = dayjs(updatedAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM/YYYY');

  return (
    <div
      className={`card ${
        active
          ? 'bg-primary'
          : 'bg-base-200 border-2 border-primary text-secondary'
      } text-primary-content mb-10 shadow-xl`}
    >
      <div className="card-body flex">
        {/* EDITABLE CONDITONAL */}
        {editable ? (
          <div>
            <button
              onClick={() =>
                router.push(
                  `/admin/operations/edit?operationId=${tradeOperation.id}`,
                )
              }
              type="button"
              className="hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => deleteTradeOperation(tradeOperation.id)}
              type="button"
              className="ml-8 hover:underline"
            >
              Apagar
            </button>
          </div>
        ) : null}

        <div className="text-sm bg-gray p-2 rounded-md">
          <p>Atualizado em: {updatedDate}</p>
          {observation && <p className="break-words">Obs: {observation}</p>}
        </div>

        <div className="flex flex-row justify-between">
          {/* LEFT ROW */}
          <div className="leftRow flex flex-col justify-between mr-10">
            <div className="mb-4 w-fit flex flex-col">
              <p className="font-bold text-2xl">
                {!active ? <s>{market}</s> : <span>{market}</span>}
              </p>

              <p className="self-end">{directionTitle()}</p>
            </div>

            <p className="font-bold mb-4">
              STATUS: {status.toLocaleUpperCase()}
            </p>

            <div className="mb-4">
              <p>Seguidores:</p>
              <p className="font-bold"> 25/30</p>
            </div>

            {result ? (
              <div className={result === 'gain' ? 'text-green' : 'text-red'}>
                <span className="text-xl font-bold">GAIN: </span>
                <span className="text-xl font-bold">20%</span>
              </div>
            ) : null}

            {!result ? (
              <button type="button" className="btn btn-secondary">
                Seguir
              </button>
            ) : null}
          </div>

          <div className="rightRow flex flex-col justify-between">
            <div className="entryZone mr-10">
              <p className="font-bold">Ordens:</p>
              <div>
                <CopyableValue value={entryOrderOne} />
                {entryOrderTwo ? <CopyableValue value={entryOrderTwo} /> : null}
                {entryOrderThree ? (
                  <CopyableValue value={entryOrderThree} />
                ) : null}
              </div>
            </div>

            <div className="stopZone mr-10">
              <p className="font-bold">Stop:</p>
              <CopyableValue value={stop} />
            </div>

            <div className="stop&profit flex flex-row md:flex-col md:mr-10 justify-between">
              <div>
                <p className="font-bold">Take profit:</p>
                <div>
                  <CopyableValue value={takeProfitOne} />
                  {takeProfitTwo ? (
                    <CopyableValue value={takeProfitTwo} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <button
        className={`btn  ${
          active ? 'btn-primary' : 'btn-disabled'
        } bg-secondary md:self-end self-center`}
        type="button"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.bitget.com/mix/usdt/${market.trimEnd()}_UMCBL`}
        >
          {market}
        </a>
      </button> */}

      {/* <div className={`${active ? 'animate-pulse' : ''}`}>
                <svg height="30" width="32" className="fill">
                  <circle
                    cx="20"
                    cy="18"
                    r="10"
                    stroke="black"
                    strokeWidth="3"
                    fill={`${colorHex}`}
                  />
                </svg>
              </div> */}
    </div>
  );
};

export default ActiveTradeOperationCard;
