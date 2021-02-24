import {
  createSuccessPopup,
  createErrorMessagePopup,
  showMessagePopup
} from './popup.js';

import {
  MAIN_PIN_COORDINATES,
  mainMarker
} from './map.js';

const MIN_PRICES = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
}
const GUESTS_BY_ROOM = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
}
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const mainContent = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const listingTitle = document.querySelector('#title');
const listingTypeSelect = document.querySelector('#type');
const pricePerNightInput = document.querySelector('#price');
const checkinTimeSelect = document.querySelector('#timein');
const checkoutTimeSelect = document.querySelector('#timeout');
const roomQuantityField = document.querySelector('#room_number');
const guestQuantityField = document.querySelector('#capacity');
const submitButton = document.querySelector('.ad-form__submit');
export const addressField = document.querySelector('#address');

const validateTitleInput = (input) => {
  if (input.validity.valid === false) {
    input.classList.add('invalid');
  } else if (input.validity.valueMissing === true) {
    input.setCustomValidity('Пожалуйста, заполните это поле');
  } else if (input.value.tooShort) {
    input.setCustomValidity(`Описание слишком короткое минимальная длинна ${MIN_TITLE_LENGTH}`);
  } else if (input.value.tooLong) {
    input.setCustomValidity(`Описание слишком длинное максимальная длинна ${MAX_TITLE_LENGTH}`);
  } else {
    input.setCustomValidity('');
    input.classList.remove('invalid');
  }

  input.reportValidity();
}

const validatePrice = (input) => {
  if (input.value >= MIN_PRICES[listingTypeSelect.value]) {
    input.setCustomValidity('');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.setCustomValidity(`Минимальная цена для этого типа сoставляет ${MIN_PRICES[listingTypeSelect.value]}`);
  }
}

const setRoomGuestsDependence = (room, guestsList) => {
  for (let guest of guestsList.children) {
    if (GUESTS_BY_ROOM[room.value].includes(guest.value)) {
      guest.disabled = false;
      guest.selected = true;
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

setRoomGuestsDependence(roomQuantityField, guestQuantityField);

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

roomQuantityField.addEventListener('change', () => {
  setRoomGuestsDependence(roomQuantityField, guestQuantityField);
});

submitButton.addEventListener('click', () => {
  validatePrice(pricePerNightInput);
  validateTitleInput(listingTitle);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch('https://22.javascript.pages.academy/keksobookin',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessagePopup(mainContent, createSuccessPopup());
        adForm.reset();
        addressField.value = `${MAIN_PIN_COORDINATES.lat}, ${MAIN_PIN_COORDINATES.lng}`;
      } else {
        showMessagePopup(mainContent, createErrorMessagePopup());
      }
    });
});

adForm.addEventListener('reset', () => {
  mainMarker.setLatLng(MAIN_PIN_COORDINATES);
  setTimeout(() => {
    addressField.value = `${MAIN_PIN_COORDINATES.lat}, ${MAIN_PIN_COORDINATES.lng}`;
  }, 1)
})
