import React, { useEffect } from 'react';
import { useTradingResume } from '../../hooks/tradeOperations/tradeOperationsResume';

const TradeOperationsResumeCard = () => {
  const { period, setPeriod, getResumeData, resumeData } = useTradingResume();

  useEffect(() => {
    getResumeData();
  }, [period]);

  return (
    <div className="card bg-primary flex h-44">
      <div className="card-body p-0">
        <div className="relative w-full px-4 bg-secondary">
          <div className="max-w-xs flex justify-around m-auto">
            <button
              onClick={() => setPeriod(7)}
              className={`h-10 ${
                period === 7 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              7D
            </button>
            <button
              onClick={() => setPeriod(30)}
              className={`h-10 ${
                period === 30 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              30D
            </button>
            <button
              onClick={() => setPeriod(90)}
              className={`h-10 ${
                period === 90 ? 'bg-primary' : 'bg-secondary'
              } hover:bg-primary border-none w-10 rounded-none`}
              type="button"
            >
              90D
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full ml-4 p-2">
          <p>
            Total Operações:{' '}
            <span className="font-bold">{resumeData.totalOperations}</span>
          </p>
          <p>
            Resultado:{' '}
            <span className="font-bold">
              {resumeData?.totalProfitPercentage?.toFixed(2)}%
            </span>
          </p>
          <p>
            Acertividade:{' '}
            <span className="font-bold">
              {resumeData?.gainPercentage?.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeOperationsResumeCard;
