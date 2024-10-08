/* eslint-disable prefer-const */
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
import TradingViewModal from './components/tradingViewModal';
import FakeTradeOperationCard from './components/fakeTradeOperationCard';
import SizeCalculatorModal from '../sizeCalculator/sizeCalculatorModal.component';

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
    // checkIsFollowing,
  } = useFollowTradeOperations();
  const router = useRouter();

  let {
    id,
    status,
    market,
    marketLocation,
    updatedAt,
    createdAt,
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
    tradingViewLink,
    stopDistance,
    entryOrdersStatus,
    takeProfitStatus,
  } = tradeOperation as TradeOperation;

  const [colorHex] = useState(() => {
    if (status === tradeStatus.active)
      return direction.toLocaleLowerCase() === 'long' ? '#16a34a' : '#b91c1c';
    return '#6b7280';
  });

  const [resultClass] = useState(() => {
    if (result === 'gain') {
      return 'text-green';
    }

    if (result === 'loss') {
      return 'text-red';
    }

    return 'text-gray';
  });

  const [isFollowing, setIsFollowing] = useState(false);

  const [isFull, setIsFull] = useState(true);

  const [canSee, setCanSee] = useState(false);

  const updatedDate = dayjs(updatedAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM');

  const createdDate = dayjs(createdAt)
    .tz('America/Sao_Paulo')
    .format('HH:mm:ss - DD/MM');

  const pulseBubble = () => (
    <div
      className={`${
        status !== tradeStatus.closed ? 'animate-pulse' : ''
      } relative`}
    >
      <svg height="24" width="20" className="fill">
        <circle
          cx="12"
          cy="14"
          r="6"
          stroke="black"
          strokeWidth="3"
          fill={`${colorHex}`}
        />
      </svg>
    </div>
  );

  const operationTitle = () => {
    const upperCaseMarket = market.toUpperCase();
    return (
      <p className="font-bold text-lg">
        {tradeOperation.status === tradeStatus.closed ? (
          <a
            className="hover:text-lightTeal"
            target="_blank"
            rel="noreferrer"
            href={`https://www.bitget.com/mix/usdt/${upperCaseMarket.trimEnd()}_UMCBL`}
          >
            <s>{upperCaseMarket}</s>
          </a>
        ) : (
          <a
            className="hover:text-lightTeal"
            target="_blank"
            rel="noreferrer"
            href={`https://www.bitget.com/mix/usdt/${upperCaseMarket.trimEnd()}_UMCBL`}
          >
            {upperCaseMarket}
          </a>
        )}
      </p>
    );
  };

  const directionTitle = () => {
    if (!canSee) {
      return <span className="font-bold text-lg text-gray">XXXX</span>;
    }

    if (direction === 'long') {
      return (
        <span className="font-bold text-lg text-green">
          {direction.toUpperCase()}
        </span>
      );
    }

    return (
      <span className="font-bold text-lg text-red">
        {direction.toUpperCase()}
      </span>
    );
  };

  const followButton = () => {
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

    if (!isFollowing && canSee) {
      return (
        <button
          type="button"
          className="btn btn-secondary max-w-[100px]"
          onClick={() => followTradeOperation(id)}
        >
          Seguir
        </button>
      );
    }

    if (!canSee) {
      return (
        <button
          type="button"
          disabled
          className="btn btn-secondary max-w-[100px]"
        >
          Seguir
        </button>
      );
    }

    return null;
  };

  const checkIsFollowing = () => {
    let followingFilter = [];

    if (history) {
      followingFilter = FollowingTradeOperations.filter(
        trade => trade.id === tradeOperation.tradeOperation.id,
      );
    }

    if (!history) {
      followingFilter = FollowingTradeOperations.filter(
        trade => trade.id === tradeOperation.id,
      );
    }

    if (followingFilter.length === 1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  const checkCanSee = () => {
    if (
      !isFull ||
      isFollowing ||
      currentAccess.isAdmin ||
      status === tradeStatus.closed
    ) {
      setCanSee(true);
    }
  };

  useEffect(() => {
    if (!history) {
      if (maxFollowers !== currentFollowers) {
        setIsFull(false);
      }
    }

    // History checks if the parent tradeOperation isFull
    if (history) {
      if (
        tradeOperation.tradeOperation.maxFollowers !==
        tradeOperation.tradeOperation.currentFollowers
      ) {
        setIsFull(false);
      }
    }
  }, []);

  useEffect(() => {
    checkIsFollowing();
  }, [FollowingTradeOperations, isFull]);

  useEffect(() => {
    checkCanSee();
  }, [isFollowing, isFull]);

  if (!canSee) return <FakeTradeOperationCard />;

  return (
    <div
      className={`card w-72  ${
        status === tradeStatus.active
          ? 'bg-primary border-2 border-opacity-60 border-lightTeal'
          : 'bg-base-200 border-2 border-primary text-secondary'
      } text-primary-content mb-10 shadow-xl text-sm ${
        !canSee ? 'blur select-none' : ''
      }`}
    >
      <div className="card-body p-6 flex min-h-[380px]">
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

        {/* OBSERVATION GRAY */}
        <div className="text-sm dark:bg-gray p-2 rounded-md mb-2">
          <p>Atualizada em: {updatedDate}</p>
          {observation ? (
            <p className="break-words w-fit">Obs: {observation}</p>
          ) : null}
        </div>

        <div className="flex flex-row justify-between">
          {/* LEFT ROW */}
          <div className="leftRow flex flex-col justify-between mr-4">
            <div className="mb-2 w-fit flex flex-col">
              <div className="flex content-start">
                {operationTitle()}
                <div className="w-full ml-2">{pulseBubble()}</div>
              </div>
              <div className="flex">
                <span className="mr-2">{directionTitle()}</span>
                <TradingViewModal imageLink={tradingViewLink} id={id} />
                <SizeCalculatorModal tradeOperation={tradeOperation} />
              </div>
              <span>{marketLocation?.toUpperCase()}</span>
            </div>

            <p className="mb-4 w-full">
              Status: <span className="font-bold">{status.toUpperCase()}</span>
            </p>

            <div className="mb-8">
              <span>Seguidores:</span>
              <span className="font-bold">
                {' '}
                {currentFollowers}/{maxFollowers}
              </span>
            </div>

            {result ? (
              <div className={resultClass}>
                <span className="text-base font-bold">
                  {result.toUpperCase()}:{' '}
                </span>
                <span className="text-base font-bold">{percentual}%</span>
              </div>
            ) : null}

            {status !== tradeStatus.closed ? followButton() : null}
          </div>

          {/* RIGHT ROW */}
          <div className="rightRow flex flex-col justify-between items-end min-h-[14em]">
            <div className="ordens w-full">
              <p className="font-bold">Ordens:</p>
              <div>
                <div className="flex flex-row justify-between">
                  <span className="mr-1">
                    {entryOrdersStatus?.entryOrderOneTriggered ? '☑ ' : '☐ '}
                  </span>
                  <CopyableValue currency value={entryOrderOne} />
                </div>
                {entryOrderTwo ? (
                  <div className="flex flex-row justify-between">
                    <span className="mr-1">
                      {entryOrdersStatus?.entryOrderTwoTriggered ? '☑' : '☐'}
                    </span>
                    <CopyableValue currency value={entryOrderTwo} />
                  </div>
                ) : null}
                {entryOrderThree ? (
                  <div className="flex flex-row justify-between">
                    <span className="mr-1">
                      {entryOrdersStatus?.entryOrderThreeTriggered ? '☑' : '☐'}
                    </span>
                    <CopyableValue currency value={entryOrderThree} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="stop w-full">
              <p className="font-bold">
                Stop:{' '}
                {stopDistance ? (
                  <span className="font-normal">{stopDistance}%</span>
                ) : null}
              </p>
              <CopyableValue currency value={stop} />
            </div>

            <div className="take-profit w-full flex flex-row md:flex-col justify-between">
              <div>
                <p className="font-bold">Take profit:</p>
                <div>
                  <div className="flex flex-row justify-between">
                    <span className="mr-1">
                      {takeProfitStatus?.takeProfitOneTriggered ? '☑' : '☐'}
                    </span>
                    <CopyableValue currency value={takeProfitOne} />
                  </div>
                  <div className="flex flex-row justify-between">
                    {takeProfitStatus?.takeProfitTwoTriggered ? '☑' : '☐'}
                    {takeProfitTwo ? (
                      <CopyableValue currency value={takeProfitTwo} />
                    ) : null}
                  </div>
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

        <p className="text-center mt-2 text-sm">Criada em: {createdDate}</p>
      </div>
    </div>
  );
};

export default TradeOperationCard;
