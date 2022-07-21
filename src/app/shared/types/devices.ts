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
  updatedAt: string;
  registration_state: boolean;
}

export interface AddDevice {
  name: string;
  description: string;
  device_group_id: string;
}
