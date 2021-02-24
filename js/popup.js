const LISTING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

export const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
export const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
export const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
export const fetchErrorMessageTemplate = document.querySelector('#fetch-error').content.querySelector('.fetch-error');

function getWordInRightCase(integer, word) {
  integer = Math.abs(integer) % 100;
  const integer1 = integer % 10;
  if (integer > 10 && integer < 20) {
    return word[2];
  } else if (integer1 > 1 && integer1 < 5) {
    return word[1];
  } else if (integer1 === 1) {
    return word[0];
  } else {
    return word[2];
  }
}

const populateListingFeatures = (featureList, destination) => {
  destination.innerHTML = '';
  featureList.forEach((feature => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', `popup__feature--${feature}`);
    destination.appendChild(li);
  }));
}

const populateListingImages = (imagesList, destination) => {
  const imagesFragment = document.createDocumentFragment();

  imagesList.forEach((image) => {
    const clonedImage = destination.querySelector('img').cloneNode();
    clonedImage.src = image;
    imagesFragment.appendChild(clonedImage);
  });

  destination.innerHTML = '';
  destination.appendChild(imagesFragment);
}

export const createCustomPopup = ({ author, offer }) => {
  const clonedCard = cardTemplate.cloneNode(true);
  clonedCard.querySelector('.popup__title').textContent = offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  clonedCard.querySelector('.popup__type').textContent = LISTING_TYPES[offer.type];
  clonedCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getWordInRightCase(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getWordInRightCase(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  populateListingFeatures(offer.features, clonedCard.querySelector('.popup__features'));
  clonedCard.querySelector('.popup__description').textContent = offer.description;
  populateListingImages(offer.photos, clonedCard.querySelector('.popup__photos'));
  clonedCard.querySelector('.popup__avatar').src = author.avatar;
  return clonedCard;
}

export const createFetchErrorPopup = (err) => {
  const clonedFetchErrorMessage = fetchErrorMessageTemplate.cloneNode(true);
  clonedFetchErrorMessage.querySelector('.fetch-error__message').textContent = err;
  return clonedFetchErrorMessage;
}

export const createSuccessPopup = () => {
  const clonedSuccessMessage = successMessageTemplate.cloneNode(true);
  return clonedSuccessMessage;
}

export const createErrorMessagePopup = () => {
  const clonedErrorMessage = errorMessageTemplate.cloneNode(true);
  return clonedErrorMessage;
}

export const showMessagePopup = (parent, message) => {
  parent.appendChild(message);
  message.addEventListener('click', () => message.remove());
  window.addEventListener('keydown', (evt) => evt.key === 'Escape' ? message.remove() : null);
}
