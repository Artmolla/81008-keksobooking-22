const listingTypeSelect = document.querySelector('#type');
const pricePerNightInput = document.querySelector('#price');
const checkinTimeSelect = document.querySelector('#timein');
const checkoutTimeSelect = document.querySelector('#timeout');
const timeOptions = document.querySelector('.ad-form__element--time');

const setTimeDependence = (checkIn, checkOut) => {
  for (let option of checkOut.children) {
    option.value === checkIn.value
      ? option.selected = true
      : option.selected = false;
  }
}

const getMinPricePerNight = (listingType) => {
  switch (listingType) {
    case 'flat':
      return '1000';
    case 'bungalow':
      return '0';
    case 'house':
      return '5000';
    case 'palace':
      return '10000';
  }
}

listingTypeSelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  pricePerNightInput.min = getMinPricePerNight(listingTypeSelect.value);
  pricePerNightInput.placeholder = getMinPricePerNight(listingTypeSelect.value);
});

timeOptions.addEventListener('change', (evt) => {
  evt.preventDefault();
  if (evt.target && evt.target === checkinTimeSelect) {
    setTimeDependence(checkinTimeSelect, checkoutTimeSelect);
  } else if (evt.target && evt.target === checkoutTimeSelect) {
    setTimeDependence(checkoutTimeSelect, checkinTimeSelect);
  }
});
