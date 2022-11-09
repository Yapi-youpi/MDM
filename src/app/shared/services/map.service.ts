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
    const tiles = L.tileLayer('http://45.147.176.126:3655/api/maps/maptiler-server-map-styles-3.12/{z}/{x}/{y}@2x.png', {
      maxZoom: 19,
    });
    tiles.addTo(this.map);
    let elem = document.querySelector('.leaflet-control-attribution');
    if (elem) {
      elem.remove();
    }
  }
}
