const generateRandomNumber = function (min, max, floatPrecision) {
  if ( min >= 0 && max >= 0 ) {
    return (Math.random() * (max - min + 1) + min).toFixed(floatPrecision);
  }
}


const validateStrLength = (str, max) => {
  return str.length <= max ? true : false;
}

generateRandomNumber(10, 100);
validateStrLength('Should return false, because it\'s too long', 10);
