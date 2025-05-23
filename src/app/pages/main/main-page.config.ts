import { IConfigContent } from '../../shared/models';
import { ICityDBModel } from './models';

export const GAME_ADD_SCORE: number = 25;

export const GAME_START_TIME: number = 15;

export const GAME_SCORE_FOR_USER: number = 30;

export const GAME_SCORE_FOR_COMPUTER: number = 15;

export const GAME_USER_WIN: number = 1500;

export const GAME_ACCEPT_LANGUAGE: IConfigContent[] = [
  {
    language: 'rus',
    content: 'ru',
  },
  {
    language: 'eng',
    content: 'en',
  },
];

export const storedCity: ICityDBModel[] = [
  {
    city: 'Альмагро',
    country: 'Аргентина',
    countryCode: 'AR',
    id: 2977973,
    latitude: -34.6,
    longitude: -58.416666666,
    name: 'Альмагро',
    population: 131699,
    region: 'Буэнос-Айрес',
    regionCode: 'C',
    regionWdId: 'Q1486',
    type: 'CITY',
    wikiDataId: 'Q2064433',
  },
  {
    city: 'Альмиранте-Браун',
    country: 'Аргентина',
    countryCode: 'AR',
    id: 132315,
    latitude: -34.783333333,
    longitude: -58.4,
    name: 'Альмиранте-Браун',
    population: 584827,
    region: 'Буэнос-Айрес',
    regionCode: 'B',
    regionWdId: 'Q44754',
    type: 'CITY',
    wikiDataId: 'Q1399432',
  },
  {
    city: 'Альта-Грасия',
    country: 'Аргентина',
    countryCode: 'AR',
    id: 2050,
    latitude: -31.666666666,
    longitude: -64.433333333,
    name: 'Альта-Грасия',
    population: 48140,
    region: 'Кордова',
    regionCode: 'X',
    regionWdId: 'Q44759',
    type: 'CITY',
    wikiDataId: 'Q48293',
  },
  {
    city: 'Аристобуло-дель-Валье',
    country: 'Аргентина',
    countryCode: 'AR',
    id: 1208,
    latitude: -27.0952,
    longitude: -54.897,
    name: 'Аристобуло-дель-Валье',
    population: 38000,
    region: 'Мисьонес',
    regionCode: 'N',
    regionWdId: 'Q44798',
    type: 'CITY',
    wikiDataId: 'Q2861426',
  },
  {
    city: 'Арресифес',
    country: 'Аргентина',
    countryCode: 'AR',
    id: 132311,
    latitude: -34.066666666,
    longitude: -60.116666666,
    name: 'Арресифес',
    population: 32215,
    region: 'Буэнос-Айрес',
    regionCode: 'B',
    regionWdId: 'Q44754',
    type: 'CITY',
    wikiDataId: 'Q777895',
  },
  {
    city: 'Москва',
    country: 'Россия',
    countryCode: 'AR',
    id: 1323113,
    latitude: 55.625578,
    longitude: 37.6063916,
    name: 'Москва',
    population: 32215,
    region: 'Москва',
    regionCode: 'B',
    regionWdId: 'Q44754',
    type: 'CITY',
    wikiDataId: 'Q777895',
  },
];
