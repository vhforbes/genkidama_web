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
    active,
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
  } = tradeOperation as TradeOperation;

  const [colorHex] = useState(() => {
    if (active)
      return direction.toLocaleLowerCase() === 'long' ? '#16a34a' : '#b91c1c';
    return '#6b7280';
  });

  console.log(market);

  const directionTitle = () => {
    if (direction === 'long') {
      return <p className="font-bold text-2xl ">{direction.toUpperCase()}</p>;
    }

    return <p className="font-bold text-2xl ">{direction.toUpperCase()}</p>;
  };

  const gainLossEven = () => {
    if (result === 'gain' || result === 'GAIN') {
      return (
        <span>
          {' | '}
          <span className="text-green">{result.toUpperCase()}</span>
        </span>
      );
    }

    if (result === 'loss' || result === 'LOSS') {
      return (
        <span>
          {' | '}
          <span className="text-red">{result.toUpperCase()}</span>
        </span>
      );
    }

    if (result === 'even' || result === 'EVEN') {
      return (
        <span>
          {' | '}
          <span className="text-[#fff]">{result.toUpperCase()}</span>
        </span>
      );
    }

    return null;
  };

  const updatedDate = dayjs(updatedAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM/YYYY');

  return (
    <div
      className={`card md:w-full ${
        active
          ? 'bg-primary'
          : 'bg-base-200 border-2 border-primary text-secondary'
      } text-primary-content mb-10 shadow-xl`}
    >
      <div className="card-body flex">
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

        <div className="cardHead flex md:flex-row flex-col justify-between">
          <p className="font-bold text-2xl mb-2">
            {!active ? <s>{market}</s> : <span>{market}</span>}
            {gainLossEven()}
          </p>
          <div className="flex w-max">
            {directionTitle()}
            <div className={`${active ? 'animate-pulse' : ''}`}>
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
            </div>
          </div>
        </div>
        <p className="text-sm mb-6">Atualizado em: {updatedDate}</p>
        <div className="cardBody flex md:flex-row flex-col">
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
          <hr className="md:hidden mt-4 mb-4" />
          <div className="stop&profit flex flex-row md:flex-col md:mr-10 justify-between">
            <div>
              <p className="font-bold">Take profit:</p>
              <div>
                <CopyableValue value={takeProfitOne} />
                {takeProfitTwo ? <CopyableValue value={takeProfitTwo} /> : null}
              </div>
            </div>
          </div>
          <hr className="md:hidden mt-4 mb-4" />
          <div className="flex md:flex-col justify-between md:ml-0">
            <div className="flex flex-col mb-6">
              <span className="font-bold">Stop:</span>{' '}
              <span>
                <CopyableValue value={stop} />
              </span>
            </div>
            <button
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTradeOperationCard;
