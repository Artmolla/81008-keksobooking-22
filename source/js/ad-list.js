import {
  generateRandomInteger,
  generateRandomFloat,
  getRandomValue,
  generateRandomList
} from './util.js';

const LISTING_TITLES = [
  'Какой-то очень классный заголовок',
  'Креативный тайтл для листинга',
]
const LISTING_DESCRIPTIONS = [
  'Комфортабельная, почти целая коробка из под холодильника, прийдется по вкусу не только дворовым котам, избалованные вискасом гурманы также останутся довольны',
  'Прохладная землянка, подойдет не только северным мишкам, бобры также останутся довольны',
  'Гнездо из еловых веток с видом на горы - идеальное место для гордых орлов',
]
const LISTING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const REGISTER_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
export const GENERATE_LIST_OF_ADS_COUNT = 10;

const createAd = () => {
  return {
    author: {
      avatar: `img/avatars/user0${generateRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: getRandomValue(LISTING_TITLES),
      address: `${generateRandomFloat(35.65000, 35.70000, 5)},${generateRandomFloat(139.70000, 139.80000, 5)}`,
      price: generateRandomInteger(100, 500),
      type: getRandomValue(LISTING_TYPES),
      rooms: generateRandomInteger(1, 100),
      guests: generateRandomInteger(1, 100),
      checkin: getRandomValue(REGISTER_HOURS),
      checkout: getRandomValue(REGISTER_HOURS),
      features: generateRandomList(FEATURES_LIST),
      description: getRandomValue(LISTING_DESCRIPTIONS),
      photos: generateRandomList(PHOTOS_LIST),
    },
    location: {
      lat: generateRandomFloat(35.65000, 35.70000, 5),
      lng: generateRandomFloat(139.70000, 139.80000, 5),
    },
  }
}

export const generateListOfAds = () => {
  return new Array(GENERATE_LIST_OF_ADS_COUNT).fill('').map(() => createAd());
}
