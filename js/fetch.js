import { renderSimilarAds } from './map.js';
import { createErrorPopup } from './popup.js'

const mapContainer = document.querySelector('.map');

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    renderSimilarAds(data);
  })
  .catch((err) => {
    mapContainer.appendChild(createErrorPopup(err));
  })

