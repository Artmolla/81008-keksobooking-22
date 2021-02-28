export const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');
const featuresField = mapFilters.querySelector('#housing-features');
const featuresList = featuresField.querySelectorAll('.map__checkbox');

import {
  mapContainer,
  removeUnmatchedAds,
  renderSimilarAds
} from './map.js';

import { getData } from './data.js';

const filterByType = (data) => data.filter((listing) => listing.offer.type === typeSelect.value || typeSelect.value === 'any');

const filterByPrice = (data) => {
  if (priceSelect.value === 'low') {
    return data.filter((listing) => listing.offer.price <= 1000);
  } else if (priceSelect.value === 'middle') {
    return data.filter((listing) => listing.offer.price >= 1000 && listing.offer.price <= 50000);
  } else if (priceSelect.value === 'high') {
    return data.filter((listing) => listing.offer.price >= 5000);
  } else {
    return data;
  }
};

const filterByRoom = (data) => {
  if (roomSelect.value === '1') {
    return data.filter((listing) => listing.offer.rooms === 1);
  } else if (roomSelect.value === '2') {
    return data.filter((listing) => listing.offer.rooms === 2);
  } else if (roomSelect.value === '3') {
    return data.filter((listing) => listing.offer.rooms === 3);
  } else {
    return data;
  }
};

const filterByGuests = (data) => {
  if (guestSelect.value === '1') {
    return data.filter((listing) => listing.offer.guests === 1);
  } else if (guestSelect.value === '2') {
    return data.filter((listing) => listing.offer.guests === 2);
  } else if (guestSelect.value === '0') {
    return data.filter((listing) => listing.offer.guests > 2);
  } else {
    return data;
  }
};

const filterByFeatures = (data) => {
  for (let feature of featuresList) {
    if (feature.checked === true) {
      return data.filter((listing) => listing.offer.features.includes(feature.value));
    } else {
      return data;
    }
  }
}

mapFilters.addEventListener('change', (evt) => {
  removeUnmatchedAds();
  if(evt.target.name === 'housing-type') {
    getData((data) => renderSimilarAds(filterByType(data)), mapContainer);
  } else if (evt.target.name === 'housing-price') {
    getData((data) => renderSimilarAds(filterByPrice(data)), mapContainer);
  } else if(evt.target.name === 'housing-rooms') {
    getData((data) => renderSimilarAds(filterByRoom(data)), mapContainer);
  } else if (evt.target.name === 'housing-guests') {
    getData((data) => renderSimilarAds(filterByGuests(data)), mapContainer);
  } else if (evt.target.name === 'features') {
    getData((data) => renderSimilarAds(filterByFeatures(data)), mapContainer);
  }
});
