export interface Users {
  avatar: string;
  activeState: boolean;
  id: string;
  login: string;
  name: string;
  role: string;
  userTags: string[];
  groupsPermissions: GroupPermissions;
}
export interface Roles {
  [key: string]: { text: string; color: string };
}
export interface Permissions {
  [key: string]: string;
}
export interface GroupPermissions {
  applicationsAdd: boolean;
  changeOperatorPassword: boolean;
  changeSelfPassword: boolean;
  createEditConfig: boolean;
  createEditDevice: boolean;
  createEditDeviceGroups: boolean;
  deleteOperators: boolean;
  operatorActivateDeactivate: boolean;
  operatorAdd: boolean;
  sendInfoMessages: boolean;
  viewDevices: boolean;
  viewUsers: boolean;
  super: boolean | false;
}
export interface Groups {
  id: string;
  name: string;
  activeState: boolean;
}

export interface DevicesConfig {
  GPS?: boolean | true;
  ID: string;
  appUpdateTime?: string | '02:00';
  applications: string[];
  autoBrightness: boolean | false;
  autoUpdate: boolean | false;
  backgroundColor: string;
  backgroundImageUrl: string;
  baseUrl: string;
  blockStatusBar: boolean | false;
  bluetooth: boolean | true;
  brightness: number | 255;
  contentAppId: string | '';
  description: string | 'Стандартная конфигурация';
  desktopHeader: string | 'NO_HEADER';
  desktopHeaderTemplate: string | '';
  disableScreenshots: boolean | false;
  eventReceivingComponent: string | '';
  iconSize: string | 'SMALL';
  keepaliveTime: number | 60000000000;
  kioskHome: boolean | false;
  kioskKeyguard: boolean | false;
  kioskLockButtons: boolean | false;
  kioskMode: boolean | false;
  kioskNotifications: boolean | false;
  kioskRecents: boolean | false;
  kioskSystemInfo: boolean | false;
  lockSafeSettings: boolean | true;
  lockVolume: boolean | false;
  mainAppId: string | '';
  manageTimeout: boolean | false;
  manageVolume: boolean | false;
  mobileData: boolean | true;
  mobileEnrollment: boolean | false;
  name: string;
  nfcState: boolean;
  orientation: number | 0;
  pushOptions: string | 'all';
  restrictions: string | '';
  scheduleAppUpdate: boolean | false;
  showWifi: boolean | false;
  systemUpdateTime: string | '00:00';
  systemUpdateType: number | 0;
  textColor: string | '';
  timeZone: string | 'auto';
  timeout: number | 30000000000;
  usbStorage: boolean | false;
  useDefaultDesignSettings: boolean | false;
  volume: number | 90;
  wifi: boolean | true;
  wifiPassword: string | '';
  wifiSSID: string | '';
  wifiSecurityType: string | '';
  allowedClasses: AllowedClasses;
  //новые поля
  appName: string | '';
  appUpdateFrom: string | '';
  appUpdateTo: string | '';
  configVersion: number;
  custom1: string | '';
  custom2: string | '';
  custom3: string | '';
  imei: string | '';
  installedApps: string[];
  lockStatusBar: false;
  mainApp: string | '';
  newNumber: string | '';
  newServerUrl: '';
  password: '';
  passwordMode: '';
  phone: '';
  removedApps: string[];
  requestUpdates: '';
  runDefaultLauncher: false;
  systemUpdateFrom: '';
  systemUpdateTo: '';
  title: '';
  vendor: '';
}

export interface AllowedClasses {}
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
  qr_code: any;
  raw_qr_code: string;
  objectId: string;
  isSelected?: boolean;
}
