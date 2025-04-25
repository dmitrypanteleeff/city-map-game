import * as L from 'leaflet';
import { IConfigContent } from '../../../../shared/models';

export const OFFERS_OPEN_STREET_MAP = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '© OpenStreetMap&nbsp;&nbsp;&nbsp;',
    //retina: '@2x',
    //detectRetina: true,
  }
);

export const OFFERS_HYBRID_MAP = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 18,
    attribution: '© Esri&nbsp;&nbsp;&nbsp;',
    //retina: '@2x',
    //detectRetina: true,
    //subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }
);

// export const ruAlphabet: string[] = ['а'];

export const ruAlphabet: string[] = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'э',
  'ю',
  'я',
];

export const engAlphabet: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const MAP_GAME_CONFIG_SCORE: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Очки',
  },
  {
    language: 'eng',
    content: 'Score',
  },
];

export const MAP_GAME_CONFIG_OPPONENT_MOVE: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Ход соперника на букву',
  },
  {
    language: 'eng',
    content: `The opponent's move to the letter`,
  },
];

export const MAP_GAME_CONFIG_USER_MOVE: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Введите город на букву',
  },
  {
    language: 'eng',
    content: `Enter the city with the letter`,
  },
];

export const MAP_GAME_CONFIG_TIMER: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Таймер',
  },
  {
    language: 'eng',
    content: `Timer`,
  },
];

export const MAP_GAME_CONFIG_USED_CITY: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Использованные города',
  },
  {
    language: 'eng',
    content: `Used cities`,
  },
];

export const MAP_GAME_CONFIG_ENTER_CITY: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Введите город',
  },
  {
    language: 'eng',
    content: `Enter the city`,
  },
];

export const MAP_GAME_CONFIG_END_THE_GAME: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Завершить игру',
  },
  {
    language: 'eng',
    content: 'End the game',
  },
];

export const MAP_GAME_CONFIG_SEARCH: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Поиск',
  },
  {
    language: 'eng',
    content: 'Search',
  },
];

export const MAP_GAME_CONFIG_BASE_LAYERS_1: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Картографическая карта',
  },
  {
    language: 'eng',
    content: 'Cartographic map',
  },
];

export const MAP_GAME_CONFIG_BASE_LAYERS_2: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Спутник',
  },
  {
    language: 'eng',
    content: 'Map view',
  },
];

export const MAP_GAME_CONFIG_CANT_FIND_THE_CITY: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Не могу найти такого города. Попробуйте другой',
  },
  {
    language: 'eng',
    content: `I can't find such a city. Try another one`,
  },
];

export const MAP_GAME_CONFIG_THIS_CITY_IS_USED: IConfigContent[] = [
  {
    language: 'rus',
    content:
      'данный город уже был использован. Он есть в списке ранее использованных городов. Введите другой',
  },
  {
    language: 'eng',
    content: `this city has already been used. It is in the list of previously used cities. Enter another one`,
  },
];

export const MAP_GAME_CONFIG_GAME_OVER: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Игра окончена',
  },
  {
    language: 'eng',
    content: 'The game is over',
  },
];

export const MAP_GAME_CONFIG_TIMES_UP_WIN: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Время вышло! Вы обыграли соперника',
  },
  {
    language: 'eng',
    content: `Time's up! You beat your opponent`,
  },
];

export const MAP_GAME_CONFIG_TIMES_UP: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Время вышло!',
  },
  {
    language: 'eng',
    content: `Time's up!`,
  },
];

export const MAP_GAME_CONFIG_ERROR: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Ошибка',
  },
  {
    language: 'eng',
    content: `Error`,
  },
];
