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
  const {
    entryOrderOne,
    entryOrderTwo,
    entryOrderThree,
    stop,
    takeProfitOne,
    takeProfitTwo,
  } = tradeOperation;

  const [risk, setRisk] = useState<number>();

  const [leverage, setLeverage] = useState<number>(10);

  const [percentualError, setPercentualError] = useState(false);

  // Percentual value in absolute, must divide it by 100 to use.

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

  // Order values in USD

  const [orderOneValueUSD, setOrderOneValueUSD] = useState<number>();

  const [orderTwoValueUSD, setOrderTwoValueUSD] = useState<number>();

  const [orderThreeValueUSD, setOrderThreeValueUSD] = useState<number>();

  // General Information

  const [weightedAveragePrice, setWeightedAveragePrice] = useState<number>();

  const [distanceToStop, setDistanceToStop] = useState<number>();

  const [monetaryStopDistance, setMonetaryStopDistance] = useState<number>();

  const [totalAssetSize, setTotalAssetSize] = useState<number>();

  const [totalAssetSizeUSD, setTotalAssetSizeUSD] = useState<number>();

  const [orders, setOrders] = useState([
    { price: entryOrderOne, proportion: orderOnePerc / 100 },
    { price: entryOrderTwo, proportion: orderTwoPerc / 100 },
    { price: entryOrderThree, proportion: orderThreePerc / 100 },
  ]);

  const formatUSD = (valueToFormat?: number, digits: number = 6) => {
    if (valueToFormat) {
      const formatedValue = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        maximumFractionDigits: digits,
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

  const handleLeverageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.target.value.replace(/[xX\s,]/g, '');

    const num = parseInt(cleanedValue, 10);
    setLeverage(num);

    if (num > 100) {
      setLeverage(100);
    }

    if (num < 1) {
      setLeverage(1);
    }
  };

  // INITIAL RENDER => SET Weighted Avarege Price / Orders value and % / Distance from stop
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

  // Updates the Percentuals, check if it matches 100% / Update the Weighted Avarege Price
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

  // Updates the STOP distance when the Weighted Avarege Price changes
  useEffect(() => {
    if (weightedAveragePrice) {
      setDistanceToStop(
        computeStopDistancePercentual(weightedAveragePrice, stop),
      );

      setMonetaryStopDistance(computeStopDistance(weightedAveragePrice, stop));
    }
  }, [weightedAveragePrice]);

  // Defines the total asset size according to the risk
  useEffect(() => {
    if (risk && monetaryStopDistance)
      setTotalAssetSize(computeTotalAssetSize(risk, monetaryStopDistance));
  }, [risk, leverage]);

  // Defines the value in USD according to the leverage
  useEffect(() => {
    if (totalAssetSize && entryOrderOne)
      setOrderOneValueUSD(
        (computeOrderSizeInAsset(totalAssetSize, orderOnePerc) *
          entryOrderOne) /
          leverage,
      );

    if (totalAssetSize && entryOrderTwo)
      setOrderTwoValueUSD(
        (computeOrderSizeInAsset(totalAssetSize, orderTwoPerc) *
          entryOrderTwo) /
          leverage,
      );

    if (totalAssetSize && entryOrderThree)
      setOrderThreeValueUSD(
        (computeOrderSizeInAsset(totalAssetSize, orderThreePerc) *
          entryOrderThree) /
          leverage,
      );

    if (totalAssetSize && weightedAveragePrice)
      setTotalAssetSizeUSD((totalAssetSize * weightedAveragePrice) / leverage);
  }, [leverage, risk, totalAssetSize]);

  return (
    <div className="flex flex-col justify-between">
      {/* FIRST SECTION - INPUTS */}

      <div className="firstSection mt-6">
        <div className="lg:mt-0 mt-4 flex flex-wrap justify-between">
          <div className="flex flex-col mr-4">
            <p>Risco máximo: </p>

            <CurrencyInput
              className="input input-bordered mt-2 w-28 text-2xl"
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

          <div className="flex flex-col mr-4">
            <p>Alavancagem: </p>

            <CurrencyInput
              className="input input-bordered mt-2 w-28 text-2xl"
              type="text"
              prefix="x "
              decimalsLimit={2}
              decimalSeparator="."
              groupSeparator=","
              placeholder="x 10"
              value={leverage || ''}
              onChange={e => handleLeverageChange(e)}
            />
          </div>

          <div className={`flex flex-col ${entryOrderTwo ? 'md:mr-4' : ''}`}>
            <p>Ordem 1: ${formatUSD(entryOrderOne)}</p>

            <CurrencyInput
              type="text"
              className={`input input-bordered mt-2 w-28 text-2xl ${
                percentualError ? 'border-red' : ''
              }`}
              prefix="% "
              id="input-example"
              decimalsLimit={2}
              decimalSeparator="."
              groupSeparator=","
              value={orderOnePerc}
              onChange={e => setOrderOnePerc(handleChange(e))}
            />
          </div>

          {entryOrderTwo && (
            <div className={`flex flex-col ${entryOrderThree ? 'mr-4' : ''}`}>
              <p>Ordem 2: ${formatUSD(entryOrderTwo)}</p>

              <CurrencyInput
                type="text"
                className={`input input-bordered mt-2 w-28 text-2xl ${
                  percentualError ? 'border-red' : ''
                }`}
                prefix="% "
                id="input-example"
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                value={orderTwoPerc}
                onChange={e => setOrderTwoPerc(handleChange(e))}
              />
            </div>
          )}

          {entryOrderThree && (
            <div className="flex flex-col">
              <p>Ordem 3: ${formatUSD(entryOrderThree)}</p>

              <CurrencyInput
                type="text"
                className={`input input-bordered mt-2 w-28 text-2xl ${
                  percentualError ? 'border-red' : ''
                }`}
                prefix="% "
                id="input-example"
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                value={orderThreePerc}
                onChange={e => setOrderThreePerc(handleChange(e))}
              />
            </div>
          )}
        </div>
      </div>

      {/* SECOND SECTION - RESULTS & INFO */}
      {!percentualError && totalAssetSize && orderOneValueUSD && (
        <div className="flex flex-col  md:mt-4">
          <div className="flex flex-wrap w-full justify-around mt-4 pb-4">
            <div className="w-fit text-left">
              <p className="text-xl">Stop: </p>
              <CopyableValue currency value={stop} />
            </div>
            <div className="w-fit text-left">
              <p className="text-xl">TP 1: </p>
              <CopyableValue currency value={takeProfitOne} />
            </div>
            {takeProfitTwo && (
              <div className="w-fit text-left">
                <p className="text-xl">TP 2: </p>
                <CopyableValue currency value={takeProfitTwo} />
              </div>
            )}
          </div>

          <hr />

          <div className="flex flex-wrap w-full justify-between mt-4 pb-4">
            <div className="w-fit mr-4 self-center font-bold text-lightTeal">
              Ordem 1:
            </div>
            <div className="w-fit text-left">
              <p>Entrada: </p>
              <CopyableValue currency value={entryOrderOne} />
            </div>
            <div className="w-fit text-left">
              <p>Valor: </p>
              <CopyableValue currency value={orderOneValueUSD} />
            </div>
            <div className="w-fit text-left">
              <p>Ativos: </p>
              <CopyableValue
                value={computeOrderSizeInAsset(totalAssetSize, orderOnePerc)}
              />
            </div>
          </div>

          <hr />

          {entryOrderTwo && orderTwoValueUSD && (
            <div className="flex flex-wrap w-full justify-between mt-4 pb-4">
              <div className="w-fit mr-4 self-center font-bold text-lightTeal">
                Ordem 2:
              </div>
              <div className="w-fit text-left ">
                <p>Entrada: </p>

                <CopyableValue currency value={entryOrderTwo} />
              </div>
              <div className="w-fit text-left ">
                <p>Valor: </p>

                <CopyableValue currency value={orderTwoValueUSD} />
              </div>
              <div className="w-fit text-left">
                <p>Ativos: </p>

                <CopyableValue
                  value={computeOrderSizeInAsset(totalAssetSize, orderTwoPerc)}
                />
              </div>
            </div>
          )}

          <hr />

          {entryOrderThree && orderThreeValueUSD && (
            <div className="flex flex-wrap w-full justify-between mt-4 pb-4">
              <div className="w-fit mr-4 self-center font-bold text-lightTeal">
                Ordem 3:
              </div>
              <div className="w-fit text-left ">
                <p>Entrada: </p>

                <CopyableValue currency value={entryOrderThree} />
              </div>
              <div className="w-fit text-left ">
                <p>Valor: </p>

                <CopyableValue currency value={orderThreeValueUSD} />
              </div>
              <div className="w-fit text-left">
                <p>Ativos: </p>

                <CopyableValue
                  value={computeOrderSizeInAsset(
                    totalAssetSize,
                    orderThreePerc,
                  )}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {risk && !percentualError && leverage && <hr />}

      {/* THIRD SECTION - DETAILS */}
      {!percentualError &&
        risk &&
        totalAssetSize &&
        totalAssetSizeUSD &&
        distanceToStop &&
        monetaryStopDistance &&
        weightedAveragePrice && (
          <div className="flex flex-wrap  justify-center mt-4 ">
            <div className="flex flex-col items-start mr-8">
              <span className="mt-2 ">
                Preço médio:{' '}
                <span className="font-bold text-lightTeal">
                  ${formatUSD(weightedAveragePrice, 2)}
                </span>
              </span>
              <span className="mt-2">
                Distancia Stop:{' '}
                <span className="font-bold text-lightTeal">
                  {formatUSD(Math.abs(distanceToStop), 2)} % | $
                  {formatUSD(Math.abs(monetaryStopDistance), 2)}{' '}
                </span>
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="mt-2">
                Ativos:{' '}
                <span className="font-bold text-lightTeal">
                  {formatUSD(Math.abs(totalAssetSize))}
                </span>
              </span>
              <span className="mt-2">
                Capital:{' '}
                <span className="font-bold text-lightTeal">
                  {' '}
                  ${formatUSD(Math.abs(totalAssetSizeUSD), 2)}
                </span>
              </span>
            </div>
          </div>
        )}
    </div>
  );
};

export default SizeCalculator;
