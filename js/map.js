/* global L:readonly */

import {
  adForm,
  enableElements
} from './disable.js';

import { mapFilters } from './filter.js';

import { createCustomPopup } from './popup.js';

import { addressField } from './form.js';

import { getData } from './data.js';

import { GENERATE_LIST_OF_ADS_COUNT } from './ad-list.js';

export const MAIN_PIN_COORDINATES = {
  lat: 35.6801,
  lng: 139.7655,
}

export const mapContainer = document.querySelector('.map');

export const map = L.map('map-canvas');

map.on('load', () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(adForm, 'input');
  enableElements(adForm, 'select');
  enableElements(adForm, 'button');
  enableElements(adForm, 'textarea');
  enableElements(mapFilters, 'input');
  enableElements(mapFilters, 'select');
})

map.setView(MAIN_PIN_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

export const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

export const mainMarker = L.marker(
  {
    lat: 35.6801,
    lng: 139.7655,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

addressField.value = `${MAIN_PIN_COORDINATES.lat}, ${MAIN_PIN_COORDINATES.lng}`;
addressField.setAttribute('readonly', 'readonly');

mainMarker.on('dragend', () => {
  addressField.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
})

mainMarker.addTo(map);

export const renderSimilarAds = (similarAdsList) => {
  similarAdsList.length > GENERATE_LIST_OF_ADS_COUNT ? similarAdsList.length = GENERATE_LIST_OF_ADS_COUNT : null;
  similarAdsList.forEach(({ author, offer, location: { lat, lng } }) => {
    const marker = L.marker({
      lat,
      lng,
    },
    {
      keepInView: true,
      icon: pinIcon,
    },
    );

    marker
      .addTo(map)
      .bindPopup(createCustomPopup({ author, offer }));
  });
};

export const removeUnmatchedAds = () => {
  map.eachLayer((marker) => {
    if (marker instanceof L.Marker && marker !== mainMarker) {
      marker.remove();
    }
  })
};

getData((data) => renderSimilarAds(data), mapContainer);
