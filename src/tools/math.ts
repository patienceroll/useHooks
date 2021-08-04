export const createRandomInt = (params?: [number, number]) => {
  const number = params || [0, 100];
  return +(Math.random() * (number[1] - number[0]) + number[0]).toFixed(0);
};
