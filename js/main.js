const generateRandomInteger = function (min, max) {
  if ( min >= 0 && max >= 0 ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } return false;
}

const generateRandomFloat = function (min, max, floatPrecision) {
  if ( min >= 0 && max >= 0 ) {
    return (Math.random() * (max - min + 1) + min).toFixed(floatPrecision);
  } return false;
}


const validateStrLength = (str, max) => {
  return str.length <= max ? true : false;
}

generateRandomInteger(10, 100);
generateRandomFloat(10, 100, 2);
validateStrLength('Should return false, because it\'s too long', 10);
