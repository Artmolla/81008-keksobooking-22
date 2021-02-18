export const mapFilters = document.querySelector('.map__filters');
export const adForm = document.querySelector('.ad-form');

const disableElements = (parent, selector) => {
  parent.querySelectorAll(selector)
    .forEach((element) => element.disabled = true);
};

export const enableElements = (parent, selector) => {
  parent.querySelectorAll(selector)
    .forEach((element) => element.disabled = false);
};

adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');
disableElements(adForm, 'input');
disableElements(adForm, 'select');
disableElements(adForm, 'button');
disableElements(adForm, 'textarea');
disableElements(mapFilters, 'input');
disableElements(mapFilters, 'select');
