export const formatFloat = (number: number | string) => {
  return parseFloat(number?.toString())?.toFixed(2);
};
