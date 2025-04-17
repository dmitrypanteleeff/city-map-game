import * as L from 'leaflet';

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

export const ruAlphabet: string[] = ['а'];

// export const ruAlphabet: string[] = [
//   'а',
//   'б',
//   'в',
//   'г',
//   'д',
//   'е',
//   'ж',
//   'з',
//   'и',
//   'к',
//   'л',
//   'м',
//   'н',
//   'о',
//   'п',
//   'р',
//   'с',
//   'т',
//   'у',
//   'ф',
//   'х',
//   'ц',
//   'ч',
//   'ш',
//   'щ',
//   'э',
//   'ю',
//   'я',
// ];

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

// export const vehicleMarker = L.marker([40.4168, -3.70379], {
//   icon: L.icon({
//     iconSize: [25, 41],
//     iconAnchor: [13, 41],
//     iconUrl: 'assets/marker-icon.png',
//     shadowUrl: 'assets/marker-shadow.png',
//   })
// });
