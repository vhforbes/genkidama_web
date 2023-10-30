import React, { useEffect } from 'react';
import { useTradingResume } from '../../hooks/tradeOperations/tradeOperationsResume';

const TradeOperationsResumeCard = () => {
  const { period, setPeriod, getResumeData, resumeData } = useTradingResume();

  useEffect(() => {
    if (window.location.pathname === '/home') {
      setPeriod(180);
    }

    if (window.location.pathname === '/') {
      setPeriod(7);
    }
  }, []);

  useEffect(() => {
    getResumeData();
  }, [period]);

  return (
    <div className="card bg-primary flex h-64 border-2 border-lightTeal border-opacity-40">
      <div className="card-body p-0">
        <div className="relative w-full px-4 bg-secondary borrder-2 border-b-slate900">
          <div className="max-w-xs flex justify-around m-auto">
            <button
              onClick={() => setPeriod(7)}
              className={`h-10 ${
                period === 7 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              7d
            </button>
            <button
              onClick={() => setPeriod(15)}
              className={`h-10 ${
                period === 15 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              15d
            </button>
            <button
              onClick={() => setPeriod(30)}
              className={`${
                period === 30 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              30d
            </button>
            <button
              onClick={() => setPeriod(90)}
              className={`h-10 ${
                period === 90 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              90d
            </button>
            <button
              onClick={() => setPeriod(180)}
              className={`h-10 ${
                period === 180 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              180d
            </button>
            <button
              onClick={() => setPeriod(9999)}
              className={`h-10 ${
                period === 180 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              ALL
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-around h-full p-4 -mt-2">
          <p className="">
            Total Operações:{' '}
            <span className="font-bold text-2xl">
              {resumeData.totalOperations}
            </span>
          </p>
          <p className="">
            Resultado:{' '}
            <span
              className={`font-bold text-2xl ${
                resumeData?.totalProfitPercentage > 0
                  ? 'dark:text-lightTeal text-green'
                  : 'text-red'
              }
              `}
            >
              {resumeData?.totalProfitPercentage?.toFixed(2)}%
            </span>
          </p>

          <p className="">
            Payoff:{' '}
            <span
              className={`font-bold text-2xl ${
                resumeData?.totalRiskReturnRatio > 0
                  ? 'dark:text-lightTeal text-green'
                  : 'text-red'
              }
              `}
            >
              {resumeData?.totalRiskReturnRatio?.toFixed(2)}
            </span>
          </p>

          <div className="flex justify-center w-full">
            <p>
              Gain:{' '}
              <span className="font-bold">
                {resumeData?.gainPercentage?.toFixed(2)}%
              </span>
            </p>
            <p>
              Loss:{' '}
              <span className="font-bold">
                {resumeData?.lossPercentage?.toFixed(2)}%
              </span>
            </p>
            <p>
              Even:{' '}
              <span className="font-bold">
                {resumeData?.evenPercentage?.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeOperationsResumeCard;
