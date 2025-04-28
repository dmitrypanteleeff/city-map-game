import * as L from 'leaflet';

//* Включает взаимодействие с картой */
export function handleMapZoomEnd(map: L.Map): void {
  map.scrollWheelZoom.enable();
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.boxZoom.enable();
}
