import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Option } from '../../../shared/types/input';
import { GroupsService } from '../../../shared/services/groups.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { timer } from 'rxjs';
import { LiveQuerySubscription } from 'parse';
import { DivIcon } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  public option: Option[] = [
    {
      value: '',
      html: 'Группа',
      isSelected: true,
    },
  ];
  public sub!: LiveQuerySubscription;
  public icon!: DivIcon;
  public device_marker!: L.Marker;
  constructor(
    private mapService: MapService,
    private groupService: GroupsService,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.mapService.initMap(71.4333, 51.1667, 13);
    this.deviceSub().then();
  }

  ngAfterViewInit() {
    let t = timer(1000).subscribe(() => {
      this.groupService.getGroups('all').then((res) => {
        res.devicesGroups.map((item) => {
          let option = {
            value: item.id,
            html: item.name,
            isSelected: false,
          };
          this.option.push(option);
        });
      });
      t.unsubscribe();
    });
  }

  async deviceSub() {
    this.icon = L.divIcon({
      html: `
        <svg>
          <g filter="url(#filter0_d_736_69092)">
          <rect x="31" y="22" width="43" height="17" rx="3.5332" fill="white"/>

          <circle cx="31" cy="31" r="14.5" fill="#AFD9A1" stroke="white"/>
          <path d="M31 23L39 31L31 39L23 31L31 23Z" fill="white"/>
          </g>
          <defs>
          <filter id="filter0_d_736_69092" x="-10" y="-10" width="94" height="66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.520833 0 0 0 0 0.520833 0 0 0 0 0.520833 0 0 0 0.15 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_736_69092"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_736_69092" result="shape"/>
          </filter>
          </defs>
          <text
            y="34"
            x="58"
            font-family="HelveticaNeue"
            font-size="13"
            text-anchor="middle"
            fill="#343841">
              255
          </text>
         </svg>
      `,
      className: '',
      iconSize: [60, 30],
    });
    let query = this.db.query('Device');
    this.device_marker = L.marker([51.105, 71.5016], { icon: this.icon });
    this.device_marker.addTo(this.mapService.map);
    this.sub = await query.subscribe();
    this.sub.on('update', (item) => {
      console.log(item, 'update');
    });
    this.sub.on('open', (item) => {
      console.log(item, 'open');
    });
    query.findAll().then((res) => {
      res.map((item) => {
        console.log(item.attributes);
      });
    });
  }
}
