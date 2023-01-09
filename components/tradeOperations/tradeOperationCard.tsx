import React from 'react';

const TradeOperationCard = () => {
  return (
    <div className="card w-max bg-primary text-primary-content mb-10">
      <div className="card-body flex">
        <div className="cardHead flex justify-between mb-6">
          <div className="flex-col">
            <p className="font-bold text-2xl">BTCUSDT</p>
            <p className="text-sm">16/04/2023</p>
          </div>
          <div className="flex">
            <p className="font-bold text-2xl text-green">LONG</p>
            <div>
              <svg height="30" width="30" className="fill">
                <circle
                  cx="20"
                  cy="17.5"
                  r="10"
                  stroke="black"
                  strokeWidth="3"
                  fill="#16a34a"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="cardBody flex">
          <div className="entryZone mr-10">
            <p className="font-bold">Zona Entrada:</p>
            <p>R$ 16.000</p>
            <p>até</p>
            <p>R$ 15.000</p>
          </div>
          <div className="stop&profit mr-10">
            <p className="font-bold">Stop:</p>
            <p>R$ 16.000</p>
            <p className="font-bold">Take Profit</p>
            <p>R$ 15.000</p>
          </div>
          <button
            className="btn btn-primary bg-deepBlue self-end"
            type="button"
          >
            BTCUSDT
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeOperationCard;
