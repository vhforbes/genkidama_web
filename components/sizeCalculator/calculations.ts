type Order = {
  price?: number;
  proportion: number;
};

export const weightedAverage = (orders: Order[]): number => {
  console.log(orders);

  const sumWeightedPrices = orders.reduce(
    // eslint-disable-next-line no-unsafe-optional-chaining
    (sum, order) => sum + order.price * order.proportion,
    0,
  );
  const sumWeights = orders.reduce((sum, order) => sum + order.proportion, 0);

  console.log(sumWeightedPrices / sumWeights);

  return sumWeightedPrices / sumWeights;
};

export default { weightedAverage };
