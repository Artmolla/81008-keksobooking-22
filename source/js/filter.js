const PRICE_CONFIGURATION = {
  low: 1000,
  middle: 50000,
}
export const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');
const featuresField = mapFilters.querySelector('#housing-features');

export const filterByPrice = (listing) => {
  switch (priceSelect.value) {
    case 'low':
      return listing.offer.price <= PRICE_CONFIGURATION.low;
    case 'middle':
      return listing.offer.price >= PRICE_CONFIGURATION.low && listing.offer.price <= PRICE_CONFIGURATION.middle;
    case 'high':
      return listing.offer.price >= PRICE_CONFIGURATION.middle;
    case 'any':
      return listing;
  }
};

export const filterByFeatures = (listing) => {
  const selectedFeatures = [].map.call(featuresField.querySelectorAll('input:checked'), (input) => input.value);
  return selectedFeatures.every((feature) => listing.offer.features.includes(feature));
};

export const filterAll = (data) => {
  return data.filter((listing) => {
    return (listing.offer.type === typeSelect.value || typeSelect.value === 'any')
      && (listing.offer.rooms === +roomSelect.value || roomSelect.value === 'any')
      && (listing.offer.guests === +guestSelect.value || guestSelect.value === 'any')
      && filterByPrice(listing)
      && filterByFeatures(listing);
  })
}
