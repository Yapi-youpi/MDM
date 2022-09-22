import { App } from './apps';
import { IFile } from './files';

export interface Device {
  device_id: string;
  name: string;
  device_config_id: string;
  device_group_id: string;
  phone_number: string;
  description: string;
  active_state: boolean;
  battery_percent: number;
  imei: string;
  launcher_version: string;
  model: string;
  online_state: boolean;
  qr_code: {
    'android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE': {
      'com.sdm.BASE_URL': string;
      'com.sdm.CONFIG': string;
      'com.sdm.DEVICE_ID': string;
      'com.sdm.MQTT_HOST': string;
      'com.sdm.SERVER_PROJECT': string;
    };
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME': string;
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM': string;
    'android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION': string;
    'android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED': boolean;
    'android.app.extra.PROVISIONING_SKIP_ENCRYPTION': boolean;
    'android.app.extra.PROVISIONING_USE_MOBILE_DATA': boolean;
  };
  raw_qr_code: string;
  objectId: string;
  isSelected?: boolean;
  updatedAt: string;
  registration_state: boolean;
  gps_location: Parse.GeoPoint;
  group_name: string;
  signalLevel: string;
  device_info: {
    androidVersion: string;
    applications: App[] | null;
    batteryCharging: string;
    batteryLevel: number;
    cpu: string;
    defaultLauncher: boolean;
    deviceId: string;
    factoryReset: boolean;
    files: IFile[] | null;
    iccid: string;
    id: string;
    imei: string;
    imei2: string;
    kioskMode: boolean;
    launcherPackage: string;
    location: {
      lat: number;
      lon: number;
      ts: number;
    };
    mdmMode: boolean;
    model: string;
    permissions: number[];
    phone: string;
    phone2: string;
    serial: string;
    signalLevel: string;
  };
}

export interface AddDevice {
  name: string;
  description: string;
  device_group_id: string;
}
