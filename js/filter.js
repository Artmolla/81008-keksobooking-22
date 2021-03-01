export const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');
const featuresField = mapFilters.querySelector('#housing-features');
const featuresList = featuresField.querySelectorAll('.map__checkbox');

export const filterByType = (data) => data.filter((listing) => listing.offer.type === typeSelect.value || typeSelect.value === 'any');

export const filterByPrice = (data) => {
  switch (priceSelect.value) {
    case 'low':
      return data.filter((listing) => listing.offer.price <= 1000);
    case 'middle':
      return data.filter((listing) => listing.offer.price >= 1000 && listing.offer.price <= 50000);
    case 'high':
      return data.filter((listing) => listing.offer.price >= 50000);
    case 'any':
      return data;
  }
};

export const filterByFeatures = (data) => {
  for (let feature of featuresList) {
    if (feature.checked === true) {
      return data.filter((listing) => listing.offer.features.includes(feature.value));
    } else {
      return data;
    }
  }
};

export const filterAll = (data) => {
  return data.filter((listing) => {
    return (listing.offer.type === typeSelect.value || typeSelect.value === 'any')
      && (listing.offer.rooms === +roomSelect.value || roomSelect.value === 'any')
      && (listing.offer.guests === +guestSelect.value || guestSelect.value === 'any');
  })
}
