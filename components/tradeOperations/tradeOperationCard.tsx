/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TradeOperation {
  id: string;
  author_id: string;
  market: string;
  active: boolean;
  direction: string;
  entry_order_one: number;
  entry_order_two: number;
  entry_order_three: number;
  take_profit_one: number;
  take_profit_two: number;
  stop: number;
  created_at: string;
  updated_at: string;
  result: string;
}

interface Props {
  tradeOperation: TradeOperation;
}

const ActiveTradeOperationCard = ({ tradeOperation }: Props) => {
  const {
    active,
    market,
    updated_at,
    direction,
    entry_order_one,
    entry_order_two,
    entry_order_three,
    take_profit_one,
    take_profit_two,
    stop,
    result,
  } = tradeOperation;

  const [colorHex] = useState(() => {
    return direction === 'long' ? '#16a34a' : '#b91c1c';
  });

  const directionTitle = () => {
    if (direction === 'long') {
      return <p className="font-bold text-2xl ">{direction.toUpperCase()}</p>;
    }

    return <p className="font-bold text-2xl ">{direction.toUpperCase()}</p>;
  };

  const gainOrLoss = () => {
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

    return null;
  };

  const updatedDate = dayjs(updated_at)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM/YYYY');

  const formatBrl = (value: number) => {
    const formatedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formatedValue;
  };

  return (
    <div
      className={`card md:w-max ${
        active
          ? 'bg-primary'
          : 'bg-base-200 border-2 border-primary text-secondary'
      } text-primary-content mb-10 shadow-xl`}
    >
      <div className="card-body flex">
        <div className="cardHead flex md:flex-row flex-col justify-between">
          <p className="font-bold text-2xl mb-2">
            {!active ? <s>{market}</s> : <span>{market}</span>}
            {gainOrLoss()}
          </p>
          <div className="flex w-max">
            {directionTitle()}
            <div className="">
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
            <ul className="list-disc ml-5">
              <li>{formatBrl(entry_order_one)}</li>
              <li>{formatBrl(entry_order_two)}</li>
              {entry_order_three ? (
                <li>{formatBrl(entry_order_three)}</li>
              ) : null}
            </ul>
          </div>
          <hr className="md:hidden mt-4 mb-4" />
          <div className="stop&profit flex flex-row md:flex-col md:mr-10 justify-between">
            <div>
              <p className="font-bold">Take profit:</p>
              <ul className="list-disc ml-5">
                <li>{formatBrl(take_profit_one)}</li>
                {formatBrl(take_profit_two) ? (
                  <li>{formatBrl(take_profit_two)}</li>
                ) : null}
              </ul>
            </div>
          </div>
          <hr className="md:hidden mt-4 mb-4" />
          <div className="flex md:flex-col justify-between md:ml-0">
            <div className="flex flex-col mb-6">
              <span className="font-bold">Stop:</span>{' '}
              <span>{formatBrl(stop)}</span>
            </div>
            <button
              className={`btn  ${
                active ? 'btn-primary' : 'btn-disabled'
              } bg-secondary md:self-end self-center`}
              type="button"
            >
              BTCUSDT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTradeOperationCard;
