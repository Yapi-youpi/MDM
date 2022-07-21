import { Device } from "./devices";
import { DevicesConfig } from "./config";
import { DevicesGroup } from "./groups";
import { App } from "./apps";

interface State {
  success: boolean;
  error: string;
}

export interface DevicesConfigsState extends State {
  devicesConfigs: DevicesConfig[];
}

export interface DevicesGroupsState extends State {
  devicesGroups: DevicesGroup[];
}

export interface DevicesState extends State {
  devices: Device[];
}

export interface SingleDeviceState extends State {
  device: Device;
}

export interface AppState extends State {
  app: App[];
}

export interface UserState extends State {
  id: string;
  token: string;
}
