const needDecimals = (valueToCheck: number): boolean => {
  // Separate the integer and decimal parts
  const [integerPart, decimalPart] = valueToCheck.toString().split('.');

  // Check if there is only the decimal part
  if (parseInt(integerPart, 10) === 0 && decimalPart) {
    return true;
  }

  if (integerPart) {
    return false;
  }

  return true;
};

export default needDecimals;
