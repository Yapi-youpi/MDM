import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MapService } from '../../../shared/services/map.service';
import { Option } from '../../../shared/types/input';
import { GroupsService } from '../../../shared/services/groups.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { interval } from 'rxjs';
import { LiveQuerySubscription } from 'parse';
import * as L from 'leaflet';
import { DivIcon, Marker } from 'leaflet';
import { Device } from '../../../shared/types/devices';
import { DevicesConfigService } from '../../../shared/services/devices-config.service';
import { UserService } from '../../../shared/services/user.service';
import { DevicesGroup } from '../../../shared/types/groups';

interface DeviceGeo {
  device: Device;
  marker: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public title = 'Карта';
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
  public isFilterActive = false;
  public sub!: LiveQuerySubscription;
  public icon!: DivIcon;
  public device_marker!: L.Marker;
  public devices: Device[] = [];
  public groups: DevicesGroup[] = [];
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

  @HostListener('document:mouseup', ['$event'])
  onGlobalClick(event) {
    if (event.target.classList.contains('map-container')) {
      let elems = document.querySelectorAll('.marker');
      elems.forEach((elem) => {
        elem.classList.remove('open');
      });
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let t = interval(200).subscribe(() => {
      if (this.user.token) {
        t.unsubscribe();
        this.groupService
          .get('all')
          .then((res) => {
            this.groups = res.devicesGroups;
            res.devicesGroups.map((item) => {
              let option = {
                value: item.id,
                html: item.name,
                isSelected: false,
              };
              this.group_option.push(option);
            });
          })
          .then(() => {
            this.mapService.initMap(61.4029, 55.1561, 13);

            this.deviceSub().then();
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
      // console.log({
      //   device_id: device.name,
      //   lat: device.gps_location._latitude,
      //   lng: device.gps_location._longitude,
      // });
      let index = this.devices_geo.findIndex((item) => {
        if (item.device.device_id === device.device_id) {
          return item;
        } else {
          return -1;
        }
      });
      if (
        index !== -1 &&
        device.gps_location._latitude !== 0 &&
        device.gps_location._longitude !== 0
      ) {
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

        this.filterDevices();

        this.devices.push(device);
        this.devices_res.push(device);
      });
    });
  }

  addMarkers(lat: number, lng: number, device: Device) {
    let color = device.online_state ? '#AFD9A1' : '#FCA3A3';
    let signalLevel = !device.signalLevel
      ? ''
      : Number(device.signalLevel) < -92
      ? 'low'
      : Number(device.signalLevel) < -83
      ? 'medium'
      : 'high';
    const img = this.groups.find(
      (g) => g.id === device.device_group_id
    )?.iconID;

    this.icon = L.divIcon({
      html: `
        <div id="m_${device.device_id}" class="marker" (click)="showInfo($event)">
          <div class="marker__header">
            <div class="marker__label">
              ${device.name}
            </div>
            <div class="marker__icon" style="background-color: ${color}; background-image: url('${img}')"></div>
          </div>
          <div class="marker__info">
            <div class="marker__info-row">
              <div class="marker__info-title">Группа:</div>
              <div class="marker__info-data">${device.group_name}</div>
            </div>
            <div class="marker__info-row">
              <div class="marker__info-title">Заряд:</div>
              <div>${device.battery_percent}%</div>
            </div>
            <div class="marker__info-row">
              <div class="marker__info-title">Сигнал:</div>
              <div class="signal-level ${signalLevel}" title="${device.signalLevel}Дб">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      `,
      className: '',
      iconSize: [60, 30],
    });
    this.device_marker = L.marker([lat, lng], { icon: this.icon });
    this.device_marker.on('click', (e) => {
      const marker = e.target._icon.firstElementChild;
      let elems = document.querySelectorAll('.marker');
      elems.forEach((elem) => {
        if (elem != marker) elem.classList.remove('open');
      });
      marker?.classList.toggle('open');
    });
    let device_geo = {
      device: device,
      marker: this.device_marker,
    };
    this.devices_geo.push(device_geo);
    this.device_marker.addTo(this.mapService.map);
  }

  devicesFilter(value: string, filter: string) {
    switch (filter) {
      case 'status': {
        this.filter.active_state = value;
        this.filterDevices();
        this.isFilterActive = true;
        break;
      }
      case 'group': {
        this.filter.device_group_id = value;
        this.filterDevices();
        this.isFilterActive = true;
        break;
      }
      case 'config': {
        this.filter.device_config_id = value;
        this.filterDevices();
        this.isFilterActive = true;
        break;
      }
      case 'default': {
        this.filter.active_state = '';
        this.filter.device_group_id = '';
        this.filter.device_config_id = '';
        this.filterDevices();
        this.isFilterActive = false;
        break;
      }
    }
  }

  filterDevices() {
    const bounds = L.latLngBounds([]);

    let arr = this.devices_geo.filter((device) => {
      device.marker.remove();
      const lat_lng = [
        device.device.gps_location.latitude,
        device.device.gps_location.longitude,
      ];
      // @ts-ignore
      bounds.extend(lat_lng);

      return (
        (this.filter.active_state !== ''
          ? device.device.online_state.toString() === this.filter.active_state
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

    if (Object.keys(bounds).length > 0) {
      this.mapService.map.fitBounds(bounds);
    }
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

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
