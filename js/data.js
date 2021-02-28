import {
  MAIN_PIN_COORDINATES
} from './map.js';

import {
  adForm,
  addressField
} from './form.js';

import {
  createSuccessPopup,
  createErrorMessagePopup,
  createFetchErrorPopup,
  showMessagePopup
} from './popup-message.js';

const mainContent = document.querySelector('main');

export const getData = (onSuccess, errorDestination) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      errorDestination.appendChild(createFetchErrorPopup(err));
    });
};

export const sendData = (formData) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
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
};
