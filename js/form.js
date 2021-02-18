const MIN_PRICES = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
}
const listingTypeSelect = document.querySelector('#type');
const pricePerNightInput = document.querySelector('#price');
const checkinTimeSelect = document.querySelector('#timein');
const checkoutTimeSelect = document.querySelector('#timeout');
export const adressField = document.querySelector('#address');

const setTimeDependence = (checkIn, checkOut) => {
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
  setTimeDependence(checkinTimeSelect, checkoutTimeSelect);
});

checkoutTimeSelect.addEventListener('change', () => {
  setTimeDependence(checkoutTimeSelect, checkinTimeSelect);
});
