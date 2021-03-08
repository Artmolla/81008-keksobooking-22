import {
  MAIN_PIN_COORDINATES
} from './map.js';

import {
  adForm,
  addressField
} from './form.js';

import {
  avatarPreviewContainer,
  listingPhotoPreviewContainer
} from './avatar.js';

import { mapFilters } from './filter.js';

export const resetForm = () => {
  adForm.reset();
  avatarPreviewContainer.src = 'img/muffin-grey.svg';
  addressField.value = `${MAIN_PIN_COORDINATES.lat}, ${MAIN_PIN_COORDINATES.lng}`;
  listingPhotoPreviewContainer.innerHTML = '';
  mapFilters.reset();
}
