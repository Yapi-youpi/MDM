import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Option } from '../../../shared/types/input';
import { GroupsService } from '../../../shared/services/groups.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { interval, timer } from 'rxjs';
import { LiveQuerySubscription } from 'parse';
import { DivIcon, Marker } from 'leaflet';
import * as L from 'leaflet';
import { Device } from '../../../shared/types/devices';
import { DevicesConfigService } from '../../../services/devices-config.service';
import { UserService } from '../../../shared/services/user.service';

interface DeviceGeo {
  device: Device;
  marker: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  public group_option: Option[] = [];
  public config_option: Option[] = [];
  public status_option: Option[] = [
    {
      value: 'true',
      html: 'online',
      isSelected: false,
    },
    {
      value: 'false',
      html: 'offline',
      isSelected: false,
    },
  ];
  public filter = {
    active_state: '',
    device_group_id: '',
    device_config_id: '',
  };
  public sub!: LiveQuerySubscription;
  public icon!: DivIcon;
  public device_marker!: L.Marker;
  public devices: Device[] = [];
  public devices_res: Device[] = [];
  public devices_geo: DeviceGeo[] = [];
  public open = false;
  public search = '';
  constructor(
    private mapService: MapService,
    private groupService: GroupsService,
    private db: DatabaseService,
    protected configService: DevicesConfigService,
    protected user: UserService
  ) {}

  ngOnInit(): void {
    this.mapService.initMap(61.4029, 55.1561, 13);
    this.deviceSub().then();
  }

  ngAfterViewInit() {
    let t = interval(1000).subscribe(() => {
      if (this.user.token) {
        t.unsubscribe();
        this.eventListener();
        this.groupService.get('all').then((res) => {
          res.devicesGroups.map((item) => {
            let option = {
              value: item.id,
              html: item.name,
              isSelected: false,
            };
            this.group_option.push(option);
          });
        });
        this.configService.getConfig('all').then((res) => {
          res.map((item) => {
            let option = {
              value: item.ID,
              html: item.name,
              isSelected: false,
            };
            this.config_option.push(option);
          });
        });
        t.unsubscribe();
      }
    });
  }

  async deviceSub() {
    let query = this.db.query('Device');
    this.sub = await query.subscribe();
    let device: Device | any;
    this.sub.on('open', () => {
      console.log('OPEN PARSE CONN');
    });
    this.sub.on('update', (item) => {
      device = item.attributes;
      let index = this.devices_geo.findIndex((item) => {
        if (item.device.device_id === device.device_id) {
          return item;
        } else {
          return -1;
        }
      });
      if (index !== -1) {
        this.devices_geo[index].marker.setLatLng({
          lat: device.gps_location._latitude,
          lng: device.gps_location._longitude,
        });
      }
    });
    this.sub.on('create', (item) => {
      console.log(item.attributes);
      console.log('NEW OBJECT WAS CREATED');
    });
    query.findAll().then((res) => {
      res.map((item) => {
        device = item.attributes;
        if (device.gps_location._latitude && device.gps_location._longitude) {
          this.addMarkers(
            device.gps_location.latitude,
            device.gps_location.longitude,
            device
          );
        }
        this.devices.push(device);
        this.devices_res.push(device);
      });
    });
  }
  addMarkers(lat: number, lng: number, device: Device) {
    let color: string;
    if (device.active_state) {
      color = '#AFD9A1';
    } else {
      color = '#FCA3A3';
    }
    this.icon = L.divIcon({
      html: `<div
              class="marker-event"
              id="${device.device_id}"
            >
              <div
                class="marker-header"
              >
                <svg viewBox="0 0 200 60">
                <circle
                  class="marker-icon"
                  cx="28"
                  cy="25"
                  r="14.5"
                  fill="${color}"
                  stroke="white"
                  stroke-opacity="0.5"
                  stroke-width="1"
                  stroke-opacity="0.5"
                />
                <text
                  y="30"
                  x="50"
                  font-family="HelveticaNeueRoman"
                  font-size="12px"
                  text-anchor="start"
                  fill="#343841"
                >
                  ${device.name}
                  </text>
                </svg>
                <span class="icon icon-d-item edit_device"></span>
              </div>
              <div class="info-panel">
                <div class="marker-attributes">
                  <h4 class="marker-text"><b>Группа:</b></h4>
                  <h4 class="marker-text"><b>Заряд:</b></h4>
                  <h4 class="marker-text"><b>Сигнал:</b></h4>
                </div>
                <div style="width: 50%">
                  <h4 class="marker-text">
                    ${device.group_name ? device.group_name : 'Без группы'}
                  </h4>
                  <h4 class="marker-text">
                  ${device.battery_percent}%
                  </h4>
                  <h4 class="marker-text">
                  ${device.signalLevel ? device.signalLevel : 'Нет сигнала'}
                  </h4>
                </div>
              </div>
            </div>
            <svg id="icon_${device.device_id}" viewBox="0 0 200 60" width="200">
              <rect
                class="marker-icon"
                x="35"
                y="22"
                width="48"
                height="17"
                rx="3.5332"
                fill="white"
                stroke="rgba(133, 133, 133, 0.15)"
                stroke-opacity="0.1"
                stroke-width="1"
                stroke-opacity="0.5"
              />
              <circle
                class="marker-icon"
                cx="31"
                cy="31"
                r="14.5"
                fill="${color}"
                stroke="white"
                stroke-opacity="0.5"
                stroke-width="1"
               />
              <text
                y="35"
                x="50"
                font-family="HelveticaNeueRoman"
                font-size="12px"
                text-anchor="start"
                fill="#343841"
              >
              ${device.name}
              </text>
            </svg>
            `,
      className: '',
      iconSize: [60, 30],
    });
    this.device_marker = L.marker([lat, lng], { icon: this.icon });
    this.device_marker.on('click', (e) => {
      let id = e.target._icon.firstElementChild.id;
      let elem = document.getElementById(id);
      let icon = document.getElementById('icon_' + id);
      if (elem && icon) {
        elem.style.display = 'block';
        icon.style.display = 'none';
      }
    });
    let device_geo = {
      device: device,
      marker: this.device_marker,
    };
    this.devices_geo.push(device_geo);
    this.device_marker.addTo(this.mapService.map);
  }

  closePanel(id: string) {
    let elem = document.getElementById(id);
    if (elem) {
      elem.style.display = 'none';
    }
  }

  eventListener() {
    let elems = document.querySelectorAll('.marker-event');
    elems.forEach((elem) => {
      elem.addEventListener('click', () => {
        let el = document.getElementById(elem.id);
        let icon = document.getElementById('icon_' + elem.id);
        let t = timer(100).subscribe(() => {
          if (el) {
            el.style.display = 'none';
          }
          if (icon) {
            icon.style.display = 'block';
          }
          t.unsubscribe();
        });
      });
    });
  }

  devicesFilter(event: Option, filter: string) {
    switch (filter) {
      case 'status':
        this.filter.active_state = event.value;
        this.filterDevices();
        break;
      case 'group':
        this.filter.device_group_id = event.value;
        this.filterDevices();
        break;
      case 'config':
        this.filter.device_config_id = event.value;
        this.filterDevices();
        break;
    }
  }

  filterDevices() {
    let arr = this.devices_geo.filter((device) => {
      device.marker.remove();
      return (
        (this.filter.active_state !== ''
          ? device.device.active_state.toString() === this.filter.active_state
          : device) &&
        (this.filter.device_config_id !== ''
          ? device.device.device_config_id === this.filter.device_config_id
          : device) &&
        (this.filter.device_group_id !== ''
          ? device.device.device_group_id === this.filter.device_group_id
          : device)
      );
    });
    arr.map((d) => {
      d.marker.addTo(this.mapService.map);
      d.marker.setLatLng({
        lat: d.device.gps_location.latitude,
        lng: d.device.gps_location.longitude,
      });
    });
  }
  getValue(event) {
    this.devices = Array.from(this.devices_res);
    this.search = event;
    this.devices = this.devices.filter((device) => {
      if (device.name.toLowerCase().includes(this.search.toLowerCase())) {
        return device;
      } else {
        return false;
      }
    });
  }

  setView(device: Device) {
    this.devices = Array.from(this.devices_res);
    this.search = '';
    this.mapService.map.setView({
      lat: device.gps_location.latitude,
      lng: device.gps_location.longitude,
    });
  }
}
// if (device.device.)
// if (
//   device.device.device_config_id === this.filter.config &&
//   this.filter.config !== ''
// ) {
//   device.marker.addTo(this.mapService.map);
//   device.marker.setLatLng(
// {
//   lat: device.device.gps_location.latitude,
//     lng: device.device.gps_location.longitude,
// }
//   );
// } else {
//   device.marker.remove();
// }
