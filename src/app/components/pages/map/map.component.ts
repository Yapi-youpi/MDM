import { Component, OnInit } from "@angular/core";
import { MapService } from "../../../shared/services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.initMap(71.4333, 51.1667, 13);
  }
}
