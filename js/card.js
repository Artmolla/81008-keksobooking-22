import { generateListOfAds } from './ad-list.js';

const cardTemplate = document.querySelector('#card');
const cardContainer = document.querySelector('#map-canvas');
const cardFragment = document.createDocumentFragment();
const similarAds = generateListOfAds();

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

const checkListingType = (listingType) => {
  switch (listingType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const populateListingFeatures = (featureList, destination) => {
  destination.innerHTML = '';
  featureList.forEach((feature => {
    let li = document.createElement('li');
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

similarAds.forEach(({ author, offer }) => {
  const clonedCard = cardTemplate.cloneNode(true).content;
  clonedCard.querySelector('.popup__title').textContent = offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  clonedCard.querySelector('.popup__type').textContent = checkListingType(offer.type);
  clonedCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getWordInRightCase(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getWordInRightCase(offer.rooms, ['гостя', 'гостей', 'гостей'])}`;
  clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  populateListingFeatures(offer.features, clonedCard.querySelector('.popup__features'));
  clonedCard.querySelector('.popup__description').textContent = offer.description;
  populateListingImages(offer.photos, clonedCard.querySelector('.popup__photos'));
  clonedCard.querySelector('.popup__avatar').src = author.avatar;
  cardFragment.appendChild(clonedCard);
})

cardContainer.appendChild(cardFragment.firstElementChild);
