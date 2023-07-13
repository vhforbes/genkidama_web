import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { TradeOperation } from '../../interfaces/TradeOperation';
import CopyableValue from '../tradeOperations/components/copyableValue';
import {
  computeOrderSizeInAsset,
  computeStopDistance,
  computeStopDistancePercentual,
  computeTotalAssetSize,
  computeWeightedAverage,
} from './calculations';

interface Props {
  tradeOperation: TradeOperation;
}

const SizeCalculator = ({ tradeOperation }: Props) => {
  const { entryOrderOne, entryOrderTwo, entryOrderThree, stop } =
    tradeOperation;

  const [risk, setRisk] = useState<number>();

  const [percentualError, setPercentualError] = useState(false);

  const [orderOnePerc, setOrderOnePerc] = useState(() => {
    if (entryOrderTwo && entryOrderThree) {
      return 25;
    }

    if (entryOrderTwo && !entryOrderThree) {
      return 50;
    }

    return 100;
  });

  const [orderTwoPerc, setOrderTwoPerc] = useState(() => {
    if (entryOrderThree) return 25;

    if (entryOrderTwo && !entryOrderThree) return 50;

    return 0;
  });

  const [orderThreePerc, setOrderThreePerc] = useState(() => {
    if (entryOrderThree) return 50;

    return 0;
  });

  const [weightedAveragePrice, setWeightedAveragePrice] = useState<number>();

  const [distanceToStop, setDistanceToStop] = useState<number>();

  const [monetaryStopDistance, setMonetaryStopDistance] = useState<number>();

  const [totalSizeInUsd, setTotalSizeInUsd] = useState<number>();

  const [orders, setOrders] = useState([
    { price: entryOrderOne, proportion: orderOnePerc / 100 },
    { price: entryOrderTwo, proportion: orderTwoPerc / 100 },
    { price: entryOrderThree, proportion: orderThreePerc / 100 },
  ]);

  const formatUSD = (valueToFormat?: number) => {
    if (valueToFormat) {
      const formatedValue = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        maximumFractionDigits: 6,
      }).format(valueToFormat);

      return formatedValue;
    }

    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Replace $, % and spaces with nothing
    const cleanedValue = event.target.value.replace(/[$%\s,.]/g, '');

    // Using parseInt to convert the value to a number
    let num = parseInt(cleanedValue, 10);

    // Check if the conversion resulted in a valid number
    if (Number.isNaN(num)) {
      num = 0; // Set a default value or handle the error
    }

    return num;
  };

  useEffect(() => {
    setOrders([
      { price: entryOrderOne, proportion: orderOnePerc / 100 },
      { price: entryOrderTwo, proportion: orderTwoPerc / 100 },
      { price: entryOrderThree, proportion: orderThreePerc / 100 },
    ]);

    setWeightedAveragePrice(computeWeightedAverage(orders));

    if (weightedAveragePrice)
      setDistanceToStop(
        computeStopDistancePercentual(weightedAveragePrice, stop),
      );
  }, []);

  useEffect(() => {
    let sumPercentual;

    if (entryOrderOne && entryOrderTwo && entryOrderThree) {
      sumPercentual = orderOnePerc + orderTwoPerc + orderThreePerc;
    }

    if (entryOrderOne && entryOrderTwo && !entryOrderThree) {
      sumPercentual = orderOnePerc + orderTwoPerc;
    }

    if (entryOrderOne && !entryOrderTwo && !entryOrderThree)
      sumPercentual = orderOnePerc;

    if (sumPercentual !== 100) {
      setPercentualError(true);
    }

    if (sumPercentual === 100) {
      setPercentualError(false);
    }

    setWeightedAveragePrice(
      computeWeightedAverage([
        { price: entryOrderOne, proportion: orderOnePerc / 100 },
        { price: entryOrderTwo, proportion: orderTwoPerc / 100 },
        { price: entryOrderThree, proportion: orderThreePerc / 100 },
      ]),
    );
  }, [orderOnePerc, orderTwoPerc, orderThreePerc]);

  useEffect(() => {
    if (weightedAveragePrice) {
      setDistanceToStop(
        computeStopDistancePercentual(weightedAveragePrice, stop),
      );

      setMonetaryStopDistance(computeStopDistance(weightedAveragePrice, stop));
    }
  }, [weightedAveragePrice]);

  useEffect(() => {
    if (risk && monetaryStopDistance)
      setTotalSizeInUsd(computeTotalAssetSize(risk, monetaryStopDistance));
  }, [risk]);

  return (
    <div className="flex flex-col justify-between">
      {/* FIRST SECTION - INPUTS */}

      <div className="firstSection mt-6 flex lg:flex-row flex-col w-full justify-around h-20">
        <div className="leftRow lg:mt-0 mt-4 flex lg:flex-row flex-col justify-around">
          <div className="flex flex-col mr-4">
            <p className="w-full mr-4">Risco máximo: </p>
            <div className="w-full">
              <CurrencyInput
                className="input input-bordered w-28"
                type="text"
                prefix="$ "
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                placeholder="$ 200"
                value={risk}
                onChange={e => setRisk(handleChange(e))}
              />
            </div>
          </div>
        </div>

        <div className="rightRow lg:mt-0 mt-4 flex lg:flex-row flex-col justify-around">
          <div className="flex flex-col mr-4">
            <p>Ordem 1: ${formatUSD(entryOrderOne)}</p>
            <div className="w-full">
              <CurrencyInput
                type="text"
                className="input input-bordered w-28"
                prefix="% "
                id="input-example"
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                value={orderOnePerc}
                onChange={e => setOrderOnePerc(handleChange(e))}
              />
            </div>
          </div>

          {entryOrderTwo && (
            <div className="flex flex-col  mr-4">
              <p>Ordem 2: ${formatUSD(entryOrderTwo)}</p>
              <div className="w-full">
                <CurrencyInput
                  type="text"
                  className="input input-bordered w-28"
                  prefix="% "
                  id="input-example"
                  decimalsLimit={2}
                  decimalSeparator="."
                  groupSeparator=","
                  value={orderTwoPerc}
                  onChange={e => setOrderTwoPerc(handleChange(e))}
                />
              </div>
            </div>
          )}

          {entryOrderThree && (
            <div className="flex flex-col  mr-4">
              <p>Ordem 3: ${formatUSD(entryOrderThree)}</p>
              <div className="w-full">
                <CurrencyInput
                  type="text"
                  className="input input-bordered w-28"
                  prefix="% "
                  id="input-example"
                  decimalsLimit={2}
                  decimalSeparator="."
                  groupSeparator=","
                  value={orderThreePerc}
                  onChange={e => setOrderThreePerc(handleChange(e))}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <p>Avarage: ${weightedAveragePrice}</p>
      <p>StopDist: {distanceToStop}%</p>
      <p>MonetaryStopDist: ${monetaryStopDistance}</p>
      <p>TotalAssetSize: ${totalSizeInUsd}</p>

      {/* SECOND SECTION - RESULTS */}
      {!percentualError && totalSizeInUsd && (
        <div className="flex flex-col mt-36 md:mt-4 p-4">
          <div className="flex w-full justify-between mt-4">
            <div className="w-fit">Ordem 1:</div>
            <div className="w-fit md:pr-8 pr-4">
              <CopyableValue currency value={entryOrderOne} />
            </div>
            <div className="w-fit md:pr-8 pr-4">
              <CopyableValue
                currency
                value={
                  computeOrderSizeInAsset(totalSizeInUsd, orderOnePerc) *
                  entryOrderOne
                }
              />
            </div>
            <div className="w-fit">
              <CopyableValue
                value={computeOrderSizeInAsset(totalSizeInUsd, orderOnePerc)}
              />
            </div>
          </div>

          {entryOrderTwo && (
            <div className="flex w-full justify-between mt-4">
              <div className="w-fit">Ordem 2:</div>
              <div className="w-fit md:pr-8 pr-4">
                <CopyableValue currency value={entryOrderTwo} />
              </div>
              <div className="w-fit md:pr-8 pr-4">
                <CopyableValue
                  currency
                  value={
                    computeOrderSizeInAsset(totalSizeInUsd, orderTwoPerc) *
                    entryOrderTwo
                  }
                />
              </div>
              <div className="w-fit">
                <CopyableValue
                  value={computeOrderSizeInAsset(totalSizeInUsd, orderTwoPerc)}
                />
              </div>
            </div>
          )}

          {entryOrderThree && (
            <div className="flex w-full justify-between mt-4">
              <div className="w-fit">Ordem 3:</div>
              <div className="w-fit md:pr-8 pr-4">
                <CopyableValue currency value={entryOrderThree} />
              </div>
              <div className="w-fit md:pr-8 pr-4">
                <CopyableValue
                  currency
                  value={
                    computeOrderSizeInAsset(totalSizeInUsd, orderThreePerc) *
                    entryOrderThree
                  }
                />
              </div>
              <div className="w-fit">
                <CopyableValue
                  value={computeOrderSizeInAsset(
                    totalSizeInUsd,
                    orderThreePerc,
                  )}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SizeCalculator;
