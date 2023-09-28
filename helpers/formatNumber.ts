import needDecimals from './needDecimais';

const formatNumber = (valueToFormat?: number) => {
  if (valueToFormat) {
    const formatedValue = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      maximumFractionDigits: needDecimals(valueToFormat) ? 6 : 2,
    }).format(valueToFormat);

    return formatedValue;
  }

  return null;
};

export default formatNumber;
