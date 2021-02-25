export const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
export const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
export const fetchErrorMessageTemplate = document.querySelector('#fetch-error').content.querySelector('.fetch-error');

export const createFetchErrorPopup = (err) => {
  const clonedFetchErrorMessage = fetchErrorMessageTemplate.cloneNode(true);
  clonedFetchErrorMessage.querySelector('.fetch-error__message').textContent = err;
  return clonedFetchErrorMessage;
}

export const createSuccessPopup = () => successMessageTemplate.cloneNode(true);

export const createErrorMessagePopup = () => errorMessageTemplate.cloneNode(true);

export const showMessagePopup = (parent, message) => {
  parent.appendChild(message);
  message.addEventListener('click', () => message.remove());
  window.addEventListener('keydown', (evt) => evt.key === 'Escape' ? message.remove() : null);
}
