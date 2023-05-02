/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useTradeOperations } from '../../hooks/tradeOperations/tradeOperations';
import { TradeOperation } from '../../interfaces/TradeOperation';
import CopyableValue from './components/copyableValue';
import tradeStatus from '../../enums/tradeStatus';
import { useFollowTradeOperations } from '../../hooks/tradeOperations/followingTradeOperations';
import { useAccessControl } from '../../hooks/accessControl';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  tradeOperation: TradeOperation;
  editable?: boolean;
  history?: boolean;
}

const TradeOperationCard = ({
  tradeOperation,
  editable = false,
  history = false,
}: Props) => {
  const { deleteTradeOperation } = useTradeOperations();
  const { currentAccess } = useAccessControl();
  const {
    FollowingTradeOperations,
    followTradeOperation,
    unFollowTradeOperation,
  } = useFollowTradeOperations();
  const router = useRouter();

  const {
    id,
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
    percentual,
    maxFollowers,
    currentFollowers,
  } = tradeOperation as TradeOperation;

  const active = true;

  const [colorHex] = useState(() => {
    if (status === tradeStatus.active)
      return direction.toLocaleLowerCase() === 'long' ? '#16a34a' : '#b91c1c';
    return '#6b7280';
  });

  const [isFollowing, setIsFollowing] = useState(false);

  const pulseBubble = () => (
    <div className={`${status !== tradeStatus.closed ? 'animate-pulse' : ''}`}>
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
  );

  const operationTitle = () => (
    <p className="font-bold text-2xl">
      {tradeOperation.status === tradeStatus.closed ? (
        <a
          className="hover:text-lightTeal"
          target="_blank"
          rel="noreferrer"
          href={`https://www.bitget.com/mix/usdt/${market.trimEnd()}_UMCBL`}
        >
          <s>{market}</s>
        </a>
      ) : (
        <a
          className="hover:text-lightTeal"
          target="_blank"
          rel="noreferrer"
          href={`https://www.bitget.com/mix/usdt/${market.trimEnd()}_UMCBL`}
        >
          {market}
        </a>
      )}
    </p>
  );

  const directionTitle = () => {
    if (direction === 'long') {
      return (
        <span className="font-bold text-2xl text-green">
          {direction.toUpperCase()}
        </span>
      );
    }

    return (
      <span className="font-bold text-2xl text-red">
        {direction.toUpperCase()}
      </span>
    );
  };

  const followButton = () => {
    if (history) {
      return null;
    }

    if (isFollowing) {
      return (
        <button
          type="button"
          className="btn btn-secondary bg-red text-[#fff] max-w-[100px]"
          onClick={() => unFollowTradeOperation(id)}
        >
          Abandonar
        </button>
      );
    }

    return (
      <button
        type="button"
        className="btn btn-secondary max-w-[100px]"
        onClick={() => followTradeOperation(id)}
      >
        Seguir
      </button>
    );
  };

  // CHECK IF USER IS FOLLOWING THE OPERATION
  useEffect(() => {
    const followingFilter = FollowingTradeOperations.filter(
      trade => trade.id === id,
    );

    if (followingFilter.length === 1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [FollowingTradeOperations]);

  const updatedDate = dayjs(updatedAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM/YYYY');

  // RULE OUT THE ONES WHO ARE NOT FOLLOWING AND IF NOT ADMIN
  if (
    maxFollowers === currentFollowers &&
    !isFollowing &&
    !currentAccess.isAdmin
  ) {
    return (
      <div
        className={`card ${
          active
            ? 'bg-primary'
            : 'bg-base-200 border-2 border-primary text-secondary'
        } text-primary-content mb-10 shadow-xl p-10`}
      >
        <div className="flex">{operationTitle()}</div>
        <br />
        <h1>
          Puts parece que a casa está cheia, fique de olho para pegar a próxima
          operação...
        </h1>
      </div>
    );
  }

  // CHEGA SE A OPERAÇÃO ESTÁ COM ESPAÇO OU SE O USER ESTÁ SEGUINDO
  if (
    maxFollowers > currentFollowers ||
    isFollowing ||
    currentAccess.isAdmin ||
    history
  )
    return (
      <div
        className={`card ${
          active
            ? 'bg-primary'
            : 'bg-base-200 border-2 border-primary text-secondary'
        } text-primary-content mb-10 shadow-xl`}
      >
        <div className="card-body flex min-h-[380px]">
          {/* EDITABLE CONDITONAL */}
          <div>
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
          </div>

          <div className="text-sm dark:bg-gray p-2 rounded-md mb-4 w-full">
            <p>Atualizado em: {updatedDate}</p>
            <p className="break-words w-fit">Obs: {observation}</p>
          </div>

          <div className="flex flex-row justify-between">
            {/* LEFT ROW */}
            <div className="leftRow flex flex-col justify-between mr-10">
              <div className="mb-4 w-fit flex flex-col">
                <div className="flex">
                  {operationTitle()}
                  {pulseBubble()}
                </div>

                <p className="self-end">{directionTitle()}</p>
              </div>

              <p className="mb-4 w-full min-h-[48px]">
                Status:{' '}
                <span className="font-bold">{status.toUpperCase()}</span>
              </p>

              <div className="mb-8">
                <span>Seguidores:</span>
                <span className="font-bold">
                  {' '}
                  {currentFollowers}/{maxFollowers}
                </span>
              </div>

              {result ? (
                <div
                  className={
                    result === 'gain'
                      ? 'text-green h-[48px]'
                      : 'text-red h-[48px]'
                  }
                >
                  <span className="text-xl font-bold">
                    {result.toUpperCase()}:{' '}
                  </span>
                  <span className="text-xl font-bold">{percentual}%</span>
                </div>
              ) : null}

              {status !== tradeStatus.closed ? followButton() : null}
            </div>

            <div className="rightRow flex flex-col justify-between">
              <div className="entryZon w-full">
                <p className="font-bold">Ordens:</p>
                <div>
                  <CopyableValue value={entryOrderOne} />
                  {entryOrderTwo ? (
                    <CopyableValue value={entryOrderTwo} />
                  ) : null}
                  {entryOrderThree ? (
                    <CopyableValue value={entryOrderThree} />
                  ) : null}
                </div>
              </div>

              <div className="stopZone w-full">
                <p className="font-bold">Stop:</p>
                <CopyableValue value={stop} />
              </div>

              <div className="stop&profit w-full flex flex-row md:flex-col justify-between">
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
          {!history ? (
            <a
              href={`/operations/${tradeOperation.id}`}
              className="text-center mt-4 italic hover:text-lightTeal underline"
            >
              Histórico da operação
            </a>
          ) : null}
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
      </div>
    );

  return <h1>batata</h1>;
};

export default TradeOperationCard;
