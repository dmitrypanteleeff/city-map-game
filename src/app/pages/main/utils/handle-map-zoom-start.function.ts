import * as L from 'leaflet';

//* Отключает взаимодействие с картой */
export function handleMapZoomStart(map: L.Map): void {
  map.scrollWheelZoom.disable();
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.boxZoom.disable();
}
