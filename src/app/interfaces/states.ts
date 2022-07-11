import { Device, DevicesConfig, Groups } from "./interfaces";

interface State {
  success: boolean;
  error: string;
}

export interface DevicesConfigsState extends State {
  devicesConfigs: DevicesConfig[];
}

export interface DevicesGroupsState extends State {
  devicesGroups: Groups[];
}

export interface DevicesState extends State {
  devices: Device[];
}

export interface SingleDeviceState extends State {
  device: Device;
}
