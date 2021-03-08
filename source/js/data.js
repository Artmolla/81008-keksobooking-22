import {
  createSuccessPopup,
  createErrorMessagePopup,
  createFetchErrorPopup,
  showMessagePopup
} from './popup-message.js';

import { resetForm } from './reset.js';

const mainContent = document.querySelector('main');

export const getData = (onSuccess, errorDestination) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
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
        resetForm();
      } else {
        showMessagePopup(mainContent, createErrorMessagePopup());
      }
    });
};
