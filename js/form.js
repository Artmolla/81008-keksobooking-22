const MIN_PRICES = {
  'bungalow': '0',
  'flat': '1000',
  'house': '5000',
  'palace': '10000',
}
const listingTypeSelect = document.querySelector('#type');
const pricePerNightInput = document.querySelector('#price');
const checkinTimeSelect = document.querySelector('#timein');
const checkoutTimeSelect = document.querySelector('#timeout');

const setTimeDependance = (checkIn, checkOut) => {
  for (let option of checkOut.children) {
    option.value === checkIn.value
      ? option.selected = true
      : option.selected = false;
  }
}

listingTypeSelect.addEventListener('change', () => {
  pricePerNightInput.min = MIN_PRICES[listingTypeSelect.value];
  pricePerNightInput.placeholder = MIN_PRICES[listingTypeSelect.value];
});

checkinTimeSelect.addEventListener('change', () => {
  setTimeDependance(checkinTimeSelect, checkoutTimeSelect);
});

checkoutTimeSelect.addEventListener('change', () => {
  setTimeDependance(checkoutTimeSelect, checkinTimeSelect);
});
