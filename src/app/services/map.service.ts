import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map!: Map;
  constructor() {}

  initMap(lon, lat, zoom) {
    this.map = L.map('map-container', {
      center: [lat, lon],
      zoom: zoom,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
      }
    );
    tiles.addTo(this.map);
    let elem = document.querySelector('.leaflet-control-attribution')
    if (elem) {
      elem.remove()
    }
  }
}
