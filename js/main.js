const generateRandomInteger = (min, max) => {
  return (min >= 0 && max >= 0) ? Math.round(Math.random() * (max - min + 1)) + min : false;
}

const generateRandomFloat = (min, max, floatPrecision) => {
  return (min >= 0 && max >= 0 && floatPrecision >= 0) ? (Math.random() * (max - min + 1) + min).toFixed(floatPrecision) : false;
}


const validateStrLength = (str, max) => {
  return str.length <= max;
}

generateRandomInteger(10, 100);
generateRandomFloat(10, 100, -2);
validateStrLength('Should return false, because it\'s too long', 10);
