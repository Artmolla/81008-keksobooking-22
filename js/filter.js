export const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');
const featuresField = mapFilters.querySelector('#housing-features');

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
  const selectedFeatures = [].map.call(featuresField.querySelectorAll('input:checked'), (input) => input.value);

  return data.filter(({offer: { features }}) => {
    return selectedFeatures.every((feature) => features.includes(feature));
  })
};

export const filterAll = (data) => {
  return filterByFeatures(filterByPrice(data.filter((listing) => {
    return (listing.offer.type === typeSelect.value|| typeSelect.value === 'any')
      && (listing.offer.rooms === +roomSelect.value || roomSelect.value === 'any')
      && (listing.offer.guests === +guestSelect.value || guestSelect.value === 'any');
  })))
}
