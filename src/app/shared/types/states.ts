import { Device } from "./devices";
import { DevicesConfig } from "./config";
import { DevicesGroups } from "./groups";

interface State {
  success: boolean;
  error: string;
}

export interface DevicesConfigsState extends State {
  devicesConfigs: DevicesConfig[];
}

export interface DevicesGroupsState extends State {
  devicesGroups: DevicesGroups[];
}

export interface DevicesState extends State {
  devices: Device[];
}

export interface SingleDeviceState extends State {
  device: Device;
}

export interface UserState extends State {
  id: string;
  token: string;
}
