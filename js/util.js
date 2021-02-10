const generateRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return false;
}

const generateRandomFloat = (min, max, floatPrecision) => {
  return (min >= 0 && max >= 0 && floatPrecision >= 0)
    ? (Math.random() * (max - min + 1) + min).toFixed(floatPrecision)
    : false;
}

const getRandomValue = (array) => array[generateRandomInteger(0, array.length - 1)];
const generateRandomList = (array) => array.slice(generateRandomInteger(0, array.length));

export {
  generateRandomInteger,
  generateRandomFloat,
  getRandomValue,
  generateRandomList
};
