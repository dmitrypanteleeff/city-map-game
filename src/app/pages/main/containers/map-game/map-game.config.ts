import * as L from 'leaflet';

export const OFFERS_OPEN_STREET_MAP = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '© OpenStreetMap',
    //retina: '@2x',
    //detectRetina: true,
  }
);

export const OFFERS_HYBRID_MAP = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 18,
    attribution: '© Esri',
    //retina: '@2x',
    //detectRetina: true,
    //subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }
);

// export const vehicleMarker = L.marker([40.4168, -3.70379], {
//   icon: L.icon({
//     iconSize: [25, 41],
//     iconAnchor: [13, 41],
//     iconUrl: 'assets/marker-icon.png',
//     shadowUrl: 'assets/marker-shadow.png',
//   })
// });
