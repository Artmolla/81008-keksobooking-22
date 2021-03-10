import { mapFilters } from './filter.js';

export const adForm = document.querySelector('.ad-form');

export const setElementsAvailability = (parent, selector, available) => {
  if (available === 'false') {
    parent.querySelectorAll(selector)
      .forEach((element) => element.disabled = true);
  } else if (available === 'true') {
    parent.querySelectorAll(selector)
      .forEach((element) => element.disabled = false);
  }
};

adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');
setElementsAvailability(adForm, 'input', 'false');
setElementsAvailability(adForm, 'select', 'false');
setElementsAvailability(adForm, 'button', 'false');
setElementsAvailability(adForm, 'textarea', 'false');
setElementsAvailability(mapFilters, 'input', 'false');
setElementsAvailability(mapFilters, 'select', 'false');
