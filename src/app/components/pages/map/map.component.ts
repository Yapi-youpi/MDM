import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Option } from '../../../shared/types/input';
import { GroupsService } from '../../../shared/services/groups.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { timer } from 'rxjs';
import { LiveQuerySubscription } from 'parse';
import { DivIcon, Marker } from 'leaflet';
import * as L from 'leaflet';
import { Device } from '../../../shared/types/devices';

interface DeviceGeo {
  device_id: string;
  marker: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
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
  public devices: Device[] = [];
  public devices_geo: DeviceGeo[] = [];
  public open = false;
  constructor(
    private mapService: MapService,
    private groupService: GroupsService,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.mapService.initMap(61.4029, 55.1561, 13);
    this.deviceSub().then();
  }

  ngAfterViewInit() {
    let t = timer(1000).subscribe(() => {
      this.eventListener();
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
    let query = this.db.query('Device');
    this.sub = await query.subscribe();
    let device: Device | any;
    this.sub.on('update', (item) => {
      device = item.attributes;
      console.log(
        item.attributes,
        device.gps_location._latitude,
        device.gps_location._longitude
      );
      let index = this.devices_geo.findIndex((item) => {
        if (item.device_id === device.device_id) {
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
    this.sub.on('open', (item) => {
      console.log(item, 'open');
    });
    query.findAll().then((res) => {
      res.map((item) => {
        device = item.attributes;
        console.log(device);
        if (device.gps_location._latitude && device.gps_location._longitude) {
          this.addMarkers(
            device.gps_location._latitude,
            device.gps_location._longitude,
            device
          );
        }
        this.devices.push(device);
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
                    <circle class="marker-icon"  cx="30" cy="22" r="14.5" fill="${color}" stroke="white" />
                    <text
                      y="28"
                      x="60"
                      font-family="HelveticaNeueRoman"
                      font-size="12"
                      text-anchor="middle"
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
                  <div class="marker-attributes-values">
                    <h4 class="marker-text">
                      ${device.group_name ? device.group_name : 'Нет данных'}
                    </h4>
                    <h4 class="marker-text">
                    ${device.battery_percent}%
                    </h4>
                    <h4 class="marker-text">
                    ${device.signalLevel ? device.signalLevel : 'Нет данных'}
                    </h4>
                  </div>
                </div>
              </div>
              <svg  id="icon_${
                device.device_id
              }" viewBox="0 0 200 60" width="200">
                <rect class="marker-icon" x="35" y="22" width="80" height="17" rx="3.5332" fill="white" stroke="rgba(133, 133, 133, 0.95)" stroke-opacity="0.1" stroke-width="1" stroke-opacity="0.5" />
                <circle class="marker-icon" cx="31" cy="31" r="14.5" fill="${color}" stroke="white" stroke-opacity="0.5" stroke-width="1" stroke-opacity="0.5"/>


                <text
                  y="35"
                  x="80"
                  font-family="HelveticaNeueRoman"
                  font-size="12"
                  text-anchor="middle"
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
      device_id: device.device_id,
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
    console.log(elems);
    elems.forEach((elem) => {
      elem.addEventListener('click', () => {
        let el = document.getElementById(elem.id);
        let icon = document.getElementById('icon_' + elem.id);
        let t = timer(100).subscribe(() => {
          if (el) {
            el.style.display = 'none';
          }
          console.log(icon);
          if (icon) {
            icon.style.display = 'block';
          }
        });
      });
    });
  }

  openSelect() {
    let elem = document.querySelector('.select__head');
    if (elem) {
      elem.classList.toggle('open');
    }
    this.open = !this.open;
  }
}
// <svg id="${device.name}" style="display: block" width="195" height="160" viewBox="0 0 195 160" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g filter="url(#filter0_d_736_69126)">
// <rect x="10" y="10" width="175" height="140" rx="3.5332" fill="white"/>
// <rect x="10" y="10" width="175" height="40" fill="#DAE3F4"/>
// <path fill-rule="evenodd" clip-rule="evenodd" d="M144.073 40C148.531 40 152.145 36.4183 152.145 32C152.145 27.5817 148.531 24 144.073 24C139.614 24 136 27.5817 136 32C136 36.4183 139.614 40 144.073 40ZM139.767 36.2667H140.906L147.341 29.905L146.187 28.7608L139.767 35.1385V36.2667ZM146.432 28.5186L147.586 29.6615L148.22 29.0125C148.322 28.9118 148.378 28.759 148.378 28.6154C148.378 28.5454 148.365 28.476 148.338 28.4113C148.311 28.3466 148.271 28.2878 148.221 28.2384L147.869 27.8896C147.819 27.8399 147.76 27.8005 147.695 27.7737C147.629 27.7469 147.559 27.7332 147.488 27.7333C147.344 27.7333 147.189 27.7887 147.088 27.8896L146.432 28.5186Z" fill="#557EBE"/>
// <!--<path fill-rule="evenodd" clip-rule="evenodd" d="M164.928 40C169s.387 40 173.001 36.4183 173.001 32C173.001 27.5817 169.387 24 164.928 24C160.47 24 156.855 27.5817 156.855 32C156.855 36.4183 160.47 40 164.928 40ZM166.498 29.0286H168.382C168.465 29.0286 168.545 29.0627 168.604 29.1234C168.662 29.1841 168.695 29.2665 168.695 29.3524C168.695 29.4383 168.662 29.5206 168.604 29.5813C168.545 29.6421 168.465 29.6762 168.382 29.6762H168.048L167.675 35.8488C167.642 36.3997 167.246 36.8 166.733 36.8H163.123C162.613 36.8 162.209 36.3906 162.181 35.8472L161.808 29.6762H161.475C161.392 29.6762 161.312 29.6421 161.253 29.5813C161.194 29.5206 161.161 29.4383 161.161 29.3524C161.161 29.2665 161.194 29.1841 161.253 29.1234C161.312 29.0627 161.392 29.0286 161.475 29.0286H163.358V28.5429C163.358 28.3282 163.441 28.1223 163.588 27.9704C163.736 27.8186 163.935 27.7333 164.143 27.7333H165.713C165.921 27.7333 166.121 27.8186 166.268 27.9704C166.415 28.1223 166.498 28.3282 166.498 28.5429V29.0286ZM163.672 35.5048H163.684C163.725 35.5033 163.765 35.4934 163.803 35.4758C163.84 35.4581 163.874 35.433 163.902 35.4018C163.931 35.3707 163.952 35.3341 163.967 35.2942C163.981 35.2544 163.988 35.2119 163.986 35.1694L163.829 30.6361C163.826 30.5502 163.791 30.4691 163.73 30.4105C163.669 30.3519 163.588 30.3208 163.504 30.3238C163.421 30.3269 163.342 30.3639 163.286 30.4268C163.229 30.4897 163.199 30.5733 163.202 30.6592L163.358 35.1925C163.361 35.2764 163.396 35.3558 163.454 35.414C163.513 35.4723 163.591 35.5048 163.672 35.5048ZM165.15 35.4099C165.209 35.3492 165.242 35.2668 165.242 35.181V30.6476C165.242 30.5617 165.209 30.4794 165.15 30.4187C165.091 30.3579 165.011 30.3238 164.928 30.3238C164.845 30.3238 164.765 30.3579 164.706 30.4187C164.647 30.4794 164.614 30.5617 164.614 30.6476V35.181C164.614 35.2668 164.647 35.3492 164.706 35.4099C164.765 35.4706 164.845 35.5048 164.928 35.5048C165.011 35.5048 165.091 35.4706 165.15 35.4099ZM163.986 28.5429V29.0286H165.87V28.5429C165.87 28.5215 165.866 28.5004 165.859 28.4806C165.851 28.4609 165.839 28.4429 165.825 28.4278C165.81 28.4127 165.793 28.4008 165.773 28.3928C165.754 28.3847 165.734 28.3807 165.713 28.381H164.143C164.123 28.3807 164.102 28.3847 164.083 28.3928C164.064 28.4008 164.046 28.4127 164.032 28.4278C164.017 28.4429 164.006 28.4609 163.998 28.4806C163.99 28.5004 163.986 28.5215 163.986 28.5429ZM166.402 35.414C166.461 35.3558 166.495 35.2764 166.498 35.1925L166.655 30.6592C166.656 30.6166 166.65 30.5742 166.635 30.5344C166.621 30.4945 166.599 30.4579 166.571 30.4268C166.543 30.3957 166.509 30.3705 166.471 30.3529C166.434 30.3352 166.393 30.3253 166.352 30.3238C166.311 30.3223 166.27 30.3292 166.231 30.344C166.192 30.3589 166.157 30.3815 166.127 30.4105C166.097 30.4395 166.072 30.4743 166.055 30.513C166.038 30.5518 166.028 30.5936 166.027 30.6361L165.87 35.1694C165.869 35.2119 165.875 35.2543 165.89 35.2942C165.904 35.3341 165.926 35.3706 165.954 35.4018C165.982 35.4329 166.016 35.458 166.053 35.4757C166.091 35.4934 166.131 35.5032 166.173 35.5048H166.184C166.265 35.5048 166.344 35.4723 166.402 35.414Z" fill="#557EBE"/>-->
// <text
//             y="35"
//             x="80"
//             font-family="HelveticaNeueRoman"
//             font-size="12"
//             text-anchor="middle"
//             fill="#343841">
//               ${device.name}
//           </text>
// <path d="M35.32 97.372C35.32 96.28 34.624 95.5 33.7 95.356C34.468 95.188 34.996 94.492 34.996 93.64C34.996 92.212 33.688 91.276 31.96 91.276C30.16 91.276 28.624 92.092 28.588 94H30.364C30.436 93.172 31.024 92.728 31.948 92.728C32.716 92.728 33.232 93.1 33.232 93.76C33.232 94.504 32.716 94.924 31.684 94.924C31.576 94.924 31.324 94.924 31.18 94.912V96.184H31.828C32.656 96.184 33.436 96.412 33.436 97.384C33.436 98.164 32.836 98.752 31.96 98.752C30.952 98.752 30.148 98.296 30.112 97.144H28.252C28.276 99.076 29.644 100.192 31.96 100.192C33.868 100.192 35.32 99.028 35.32 97.372ZM42.201 100C41.973 99.472 41.985 98.884 41.985 98.32V95.644C41.985 93.916 40.533 93.628 39.285 93.628C37.497 93.628 36.513 94.336 36.417 95.716H38.013C38.133 95.008 38.457 94.768 39.237 94.768C39.993 94.768 40.353 95.032 40.353 95.596C40.353 96.1 39.945 96.196 38.841 96.34C37.617 96.496 36.141 96.688 36.141 98.308C36.141 99.472 36.981 100.18 38.349 100.18C39.093 100.18 39.825 99.928 40.353 99.4C40.377 99.676 40.389 99.772 40.473 100H42.201ZM40.341 96.988V97.684C40.341 98.572 39.717 99.064 38.829 99.064C38.241 99.064 37.893 98.752 37.893 98.236C37.893 97.48 38.553 97.408 39.141 97.312C39.573 97.24 39.945 97.216 40.341 96.988ZM44.9396 93.808H43.3316V102.196H45.0236V99.232C45.4796 99.868 46.1516 100.156 46.9316 100.156C48.5516 100.156 49.6196 98.884 49.6196 96.94C49.6196 94.948 48.5276 93.64 46.8596 93.64C46.0676 93.64 45.3956 93.94 44.9396 94.576V93.808ZM46.4396 95.008C47.3516 95.008 47.9156 95.728 47.9156 96.94C47.9156 98.116 47.3636 98.824 46.4516 98.824C45.5156 98.824 44.9636 98.116 44.9636 96.916C44.9636 95.716 45.5156 95.008 46.4396 95.008ZM56.2235 100V93.808H52.4795C51.2795 93.808 50.4275 94.6 50.4275 95.692C50.4275 96.712 51.1235 97.42 51.9995 97.564L49.9475 100H52.0355L53.8115 97.708H54.5315V100H56.2235ZM54.5315 96.484H53.1755C52.3835 96.484 52.1555 96.232 52.1555 95.752C52.1555 95.284 52.3955 95.032 53.1755 95.032H54.5315V96.484ZM64.2662 101.824V98.692H63.4622V93.808H58.5182V94.888C58.5182 96.328 58.0982 97.984 57.7382 98.692H56.9942V101.824H58.5902V100H62.6702V101.824H64.2662ZM61.7702 98.692H59.4062C59.6942 98.044 60.1022 96.532 60.1022 95.224V95.068H61.7702V98.692ZM67.0613 93.892H65.1653V95.764H67.0613V93.892ZM67.0613 98.128H65.1653V100H67.0613V98.128Z" fill="#2F4459"/>
// <text
//             y="101"
//             x="90"
//             font-family="HelveticaNeueRoman"
//             font-size="12"
//             text-anchor="middle"
//             fill="#343841">
//               ${device.battery_percent}%
//           </text>
// <path d="M34.78 65.456H28.828V74H30.7V67.052H34.78V65.456ZM35.5529 67.808H33.9449V76.196H35.6369V73.232C36.0929 73.868 36.7649 74.156 37.5449 74.156C39.1649 74.156 40.2329 72.884 40.2329 70.94C40.2329 68.948 39.1409 67.64 37.4729 67.64C36.6809 67.64 36.0089 67.94 35.5529 68.576V67.808ZM37.0529 69.008C37.9649 69.008 38.5289 69.728 38.5289 70.94C38.5289 72.116 37.9769 72.824 37.0649 72.824C36.1289 72.824 35.5769 72.116 35.5769 70.916C35.5769 69.716 36.1289 69.008 37.0529 69.008ZM46.7682 67.808H45.0042L43.6362 72.02L42.2202 67.808H40.3842L42.6282 73.724C42.6522 73.796 42.6762 73.904 42.6762 73.964C42.6762 74.48 42.3762 74.792 41.8122 74.792H40.9842V76.196C41.8122 76.208 41.5962 76.208 42.1242 76.208C43.6962 76.208 43.9842 75.344 44.4882 73.976L46.7682 67.808ZM53.1588 74V67.808H47.3868V74H49.0788V69.116H51.4668V74H53.1588ZM60.2721 74V67.808H54.5001V74H56.1921V69.116H58.5801V74H60.2721ZM67.3494 74C67.1214 73.472 67.1334 72.884 67.1334 72.32V69.644C67.1334 67.916 65.6814 67.628 64.4334 67.628C62.6454 67.628 61.6614 68.336 61.5654 69.716H63.1614C63.2814 69.008 63.6054 68.768 64.3854 68.768C65.1414 68.768 65.5014 69.032 65.5014 69.596C65.5014 70.1 65.0934 70.196 63.9894 70.34C62.7654 70.496 61.2894 70.688 61.2894 72.308C61.2894 73.472 62.1294 74.18 63.4974 74.18C64.2414 74.18 64.9734 73.928 65.5014 73.4C65.5254 73.676 65.5374 73.772 65.6214 74H67.3494ZM65.4894 70.988V71.684C65.4894 72.572 64.8654 73.064 63.9774 73.064C63.3894 73.064 63.0414 72.752 63.0414 72.236C63.0414 71.48 63.7014 71.408 64.2894 71.312C64.7214 71.24 65.0934 71.216 65.4894 70.988ZM70.448 67.892H68.552V69.764H70.448V67.892ZM70.448 72.128H68.552V74H70.448V72.128Z" fill="#2F4459"/>
// <text
//             y="75"
//             x="95"
//             font-family="HelveticaNeueRoman"
//             font-size="12"
//             text-anchor="middle"
//             fill="#343841">
//               ${device.description}
//           </text>
// <path d="M36.46 122.7H34.6C34.444 123.948 33.772 124.62 32.644 124.62C31.264 124.62 30.388 123.492 30.388 121.728C30.388 120.3 31.024 118.824 32.668 118.824C33.676 118.824 34.372 119.376 34.564 120.312H36.4C36.256 118.548 34.756 117.252 32.704 117.252C30.088 117.252 28.504 119.232 28.504 121.716C28.504 124.416 30.148 126.204 32.632 126.204C34.972 126.204 36.268 124.788 36.46 122.7ZM43.3385 126V119.808H41.4065L39.1985 123.996V119.808H37.5665V126H39.4985L41.7065 121.812V126H43.3385ZM49.3598 121.116V119.808H44.6798V126H46.3718V121.116H49.3598ZM55.8893 126V119.808H54.1973V122.052H51.8093V119.808H50.1173V126H51.8093V123.396H54.1973V126H55.8893ZM62.9666 126C62.7386 125.472 62.7506 124.884 62.7506 124.32V121.644C62.7506 119.916 61.2986 119.628 60.0506 119.628C58.2626 119.628 57.2786 120.336 57.1826 121.716H58.7786C58.8986 121.008 59.2226 120.768 60.0026 120.768C60.7586 120.768 61.1186 121.032 61.1186 121.596C61.1186 122.1 60.7106 122.196 59.6066 122.34C58.3826 122.496 56.9066 122.688 56.9066 124.308C56.9066 125.472 57.7466 126.18 59.1146 126.18C59.8586 126.18 60.5906 125.928 61.1186 125.4C61.1426 125.676 61.1546 125.772 61.2386 126H62.9666ZM61.1066 122.988V123.684C61.1066 124.572 60.4826 125.064 59.5946 125.064C59.0066 125.064 58.6586 124.752 58.6586 124.236C58.6586 123.48 59.3186 123.408 59.9066 123.312C60.3386 123.24 60.7106 123.216 61.1066 122.988ZM69.8572 126V119.808H64.8892L64.7932 123.492C64.7692 124.38 64.5172 124.776 64.0252 124.776C63.8452 124.776 63.6652 124.74 63.5452 124.716V126.072C63.7252 126.144 64.2292 126.192 64.4692 126.192C66.3412 126.192 66.4132 124.584 66.4612 123.3L66.5332 121.116H68.1652V126H69.8572ZM73.1785 119.892H71.2825V121.764H73.1785V119.892ZM73.1785 124.128H71.2825V126H73.1785V124.128Z" fill="#2F4459"/>
// <rect x="84" y="119" width="4" height="8" rx="2" fill="#557EBE"/>
// <rect x="91" y="114" width="4" height="13" rx="2" fill="#557EBE"/>
// <rect x="98" y="109" width="4" height="18" rx="2" fill="#DAE3F4"/>
// <circle cx="41" cy="32" r="14.5" fill="#AFD9A1" stroke="white"/>
// <path d="M41 24L49 32L41 40L33 32L41 24Z" fill="white"/>
// </g>
// <defs>
// <filter id="filter0_d_736_69126" x="0" y="0" width="195" height="160" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// <feOffset/>
// <feGaussianBlur stdDeviation="5"/>
// <feComposite in2="hardAlpha" operator="out"/>
// <feColorMatrix type="matrix" values="0 0 0 0 0.520833 0 0 0 0 0.520833 0 0 0 0 0.520833 0 0 0 0.15 0"/>
// <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_736_69126"/>
// <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_736_69126" result="shape"/>
// </filter>
// </defs>
// </svg>
