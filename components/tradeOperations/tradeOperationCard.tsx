/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import dayjs from 'dayjs';

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
    created_at,
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
    if (result === 'gain') {
      return (
        <span>
          {' | '}
          <span className="text-green"> GAIN</span>
        </span>
      );
    }

    if (result === 'loss') {
      return (
        <span>
          {' | '}
          <span className="text-red"> LOSS</span>
        </span>
      );
    }

    return null;
  };

  const updatedDate = dayjs(updated_at).format('HH:mm:ss - DD/MM/YYYY');

  return (
    <div
      className={`card w-max ${
        active
          ? 'bg-primary'
          : 'bg-base-200 border-2 border-primary text-secondary'
      } text-primary-content mb-10`}
    >
      <div className="card-body flex">
        <div className="cardHead flex justify-between mb-6">
          <div className="flex-col">
            <p className="font-bold text-2xl mb-2">
              {!active ? <s>{market}</s> : <span>{market}</span>}
              {gainOrLoss()}
            </p>
            <p className="text-sm">Atualizado em: {updatedDate}</p>
            {/* <p className="text-sm">Atualizado em: {updatedDate}</p> */}
          </div>
          <div className="flex">
            {directionTitle()}
            <div>
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
        <div className="cardBody flex">
          <div className="entryZone mr-10">
            <p className="font-bold">Ordens:</p>
            <ul className="list-disc ml-5">
              <li>R$ {entry_order_one}</li>
              <li>R$ {entry_order_two}</li>
              {entry_order_three ? <li>R$ {entry_order_three}</li> : null}
            </ul>
          </div>
          <div className="stop&profit mr-10 flex flex-col">
            <div>
              <p className="font-bold">Take profit:</p>
              <ul className="list-disc ml-5">
                <li>R$ {take_profit_one}</li>
                {take_profit_two ? <li>R$ {take_profit_two}</li> : null}
              </ul>
            </div>
            <p>
              <span className="font-bold">Stop:</span> R$ {stop}
            </p>
          </div>
          <button
            className={`btn  ${
              active ? 'btn-primary' : 'btn-disabled'
            } bg-secondary self-end`}
            type="button"
          >
            BTCUSDT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTradeOperationCard;
