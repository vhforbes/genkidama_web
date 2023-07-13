type Order = {
  price?: number;
  proportion: number;
};

// eslint-disable-next-line import/prefer-default-export
export const computeWeightedAverage = (orders: Order[]): number => {
  const sumWeightedPrices = orders.reduce((sum, order) => {
    const price = order.price ?? 0;
    return sum + price * order.proportion;
  }, 0);

  const sumWeights = orders.reduce((sum, order) => sum + order.proportion, 0);

  return sumWeightedPrices / sumWeights;
};

export const computeStopDistancePercentual = (
  weightedAveragePrice: number,
  stopPrice: number,
): number => {
  // Guard against division by zero
  if (weightedAveragePrice === 0) {
    throw new Error('Weighted average price cannot be zero');
  }

  const stopDistance =
    ((stopPrice - weightedAveragePrice) / weightedAveragePrice) * 100;

  return stopDistance;
};

export const computeStopDistance = (
  medianPrice: number,
  stopPrice: number,
): number => {
  return stopPrice - medianPrice;
};

export const computeTotalAssetSize = (
  risk: number,
  monetaryValueToStop: number,
): number => {
  const totalAssetSize = risk / monetaryValueToStop;

  return totalAssetSize;
};

export const computeOrderSizeInAsset = (
  totalAssetSizeInUsd: number,
  orderPercentual: number,
): number => {
  // console.log(totalAssetSizeInUsd);

  const orderSize = totalAssetSizeInUsd * (orderPercentual / 100);

  return orderSize;
};
