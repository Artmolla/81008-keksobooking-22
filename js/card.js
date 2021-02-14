import { generateListOfAds } from './ad-list.js';

const cardTemplate = document.querySelector('#card');
const cardContainer = document.querySelector('#map-canvas');
const similarAds = generateListOfAds();

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

similarAds.forEach(({
  author: {avatar},
  offer: {title, address, price, type, rooms,guests, checkin, checkout, features, description, photos}}) => {
  const clonedCard = cardTemplate.cloneNode(true).content;
  clonedCard.querySelector('.popup__title').textContent = title;
  clonedCard.querySelector('.popup__text--address').textContent = address;
  clonedCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  clonedCard.querySelector('.popup__type').textContent = checkListingType(type);
  clonedCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin} выезд до ${checkout}`;
  populateListingFeatures(features, clonedCard.querySelector('.popup__features'));
  clonedCard.querySelector('.popup__description').textContent = description;
  populateListingImages(photos, clonedCard.querySelector('.popup__photos'));
  clonedCard.querySelector('.popup__avatar').src = avatar;
  cardContainer.appendChild(clonedCard);
})
