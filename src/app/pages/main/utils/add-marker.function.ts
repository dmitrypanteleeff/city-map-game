import * as L from 'leaflet';

/** Добавление маркера на карту */
export function addMarker(map: L.Map, name: string, y: number, x: number) {
  const marker = new L.Marker([y, x]).setIcon(
    L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'marker.svg',
    })
  );

  marker.addTo(map).on('click', function (e) {
    //console.log(e.latlng);
    /*
    let lat = e.latlng.lat;
    let long = e.latlng.lng;
    console.log(lat)
    let popup = L.popup().setContent("I am a standalone popup.");
    marker.bindPopup(popup).openPopup();
    */
  });

  let contentPopup = `
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div>
            <b>Название:&nbsp;</b>
          </div>
          <div>
            ${name}
          </div>
        </div>
        <div class="d-flex">
          <div>
            <b>Широта:&nbsp;</b>
          </div>
          <div>
            ${y}
          </div>
        </div>
        <div class="d-flex">
          <div>
            <b>Долгота:&nbsp;</b>
          </div>
          <div>
            ${x}
          </div>
        </div>
      </div>
    `;

  marker.bindPopup(contentPopup);

  const fg = L.featureGroup().addTo(map);
  fg.on('click', function (e) {
    const layer = e.layer;
    layer.bindPopup(layer.popcontent).openPopup();
  });
  //let popup = L.popup().setContent("I am a standalone popup.");
  //marker.bindPopup(popup).openPopup();
}
