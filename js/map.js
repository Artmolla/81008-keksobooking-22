/* global L:readonly */

import {
  mapFilters,
  adForm,
  enableElements
} from './disable.js';

import {
  similarAds,
  createCustomPopup
} from './popup.js';

import { adressField } from './form.js';

const mainPinCoordinates = {
  lat: 35.6801,
  lng: 139.7655,
}

const map = L.map('map-canvas');

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

map.setView(mainPinCoordinates, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/../img/main-pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const pinIcon = L.icon({
  iconUrl: '/../img/pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const mainMarker = L.marker(
  {
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

adressField.value = `lat: ${mainPinCoordinates.lat}, lng:${mainPinCoordinates.lng}`;
adressField.setAttribute('readonly','readonly');

mainMarker.on('dragend', () => {
  adressField.value = `lat: ${mainMarker.getLatLng().lat.toFixed(5)}, lng:${mainMarker.getLatLng().lng.toFixed(5)}`;
})

mainMarker.addTo(map);

similarAds.forEach(({ author, offer, location: { lat, lng } }) => {
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
