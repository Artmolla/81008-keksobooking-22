const MIN_PRICES = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
}
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const listingTitle = document.querySelector('#title');
const listingTypeSelect = document.querySelector('#type');
const pricePerNightInput = document.querySelector('#price');
const checkinTimeSelect = document.querySelector('#timein');
const checkoutTimeSelect = document.querySelector('#timeout');
const roomQuantityField = document.querySelector('#room_number');
const guestQuantityField = document.querySelector('#capacity');
const submitButton = document.querySelector('.ad-form__submit');
export const adressField = document.querySelector('#address');

const validateInput = (input) => {
  if (input.validity.valueMissing === true) {
    input.setCustomValidity('Пожалуйста, заполните это поле');
  } else if (input.value.tooShort) {
    input.setCustomValidity(`Описание слишком короткое минимальная длинна ${MIN_TITLE_LENGTH}`);
  } else if (input.value.tooLong) {
    input.setCustomValidity(`Описание слишком длинное максимальная длинна ${MAX_TITLE_LENGTH}`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
}

const validatePrice = (input) => {
  input.value > MIN_PRICES[listingTypeSelect.value]
    ? input.setCustomValidity('')
    : input.setCustomValidity(`Минимальная цена ${MIN_PRICES[listingTypeSelect.value]}`);
}

const setRoomGuestsDependence = (room, guestsList) => {
  for (let guest of guestsList.children) {
    if (room.value === '1' && guest.value === '1') {
      guest.selected = true;
      guest.disabled = false;
    } else if (room.value === '2' && guest.value === '1' || room.value === '2' && guest.value === '2') {
      guest.selected = true;
      guest.disabled = false;
    } else if (room.value === '3' && guest.value === '1' || room.value === '3' && guest.value === '2' || room.value === '3' && guest.value === '3') {
      guest.selected = true;
      guest.disabled = false;
    } else if (room.value === '100' && guest.value === '0' || room.value === '0' && guest.value === '100') {
      guest.selected = true;
      guest.disabled = false;
    } else {
      guest.disabled = true;
    }
  }
}

const setTimeDependence = (checkIn, checkOut) => {
  for (let option of checkOut.children) {
    option.value === checkIn.value
      ? option.selected = true
      : option.selected = false;
  }
}

listingTitle.addEventListener('input', () => {
  const listingTitleLength = listingTitle.value.length;
  if (listingTitleLength < MIN_TITLE_LENGTH) {
    listingTitle.setCustomValidity(`Добавьте еще ${MIN_TITLE_LENGTH - listingTitleLength} символов`);
  } else if (listingTitleLength > MAX_TITLE_LENGTH) {
    listingTitle.setCustomValidity(`Слишком длинное описание, удалите ${listingTitleLength - MAX_TITLE_LENGTH} символов`);
  } else {
    listingTitle.setCustomValidity('');
  }

  listingTitle.reportValidity();
})

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

guestQuantityField.addEventListener('change', () => {
  setRoomGuestsDependence(guestQuantityField, roomQuantityField);
})
roomQuantityField.addEventListener('change', () => {
  setRoomGuestsDependence(roomQuantityField, guestQuantityField);
})

submitButton.addEventListener('click', () => {
  validateInput(listingTitle);
  validateInput(pricePerNightInput);
  validatePrice(pricePerNightInput);
})
