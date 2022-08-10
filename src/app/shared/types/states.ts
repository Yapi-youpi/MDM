import { Device } from './devices';
import { DevicesConfig } from './config';
import { DevicesGroup } from './groups';
import { App } from './apps';

export interface State {
  success: boolean;
  error: string;
}

export interface UserState extends State {
  id: string;
  token: string;
}

export interface DevicesConfigsState extends State {
  devicesConfigs: DevicesConfig[] | null;
}

export interface DevicesGroupsState extends State {
  devicesGroups: DevicesGroup[] | null;
}

export interface DevicesState extends State {
  devices: Device[] | null;
}

export interface SingleDeviceState extends State {
  device: Device | null;
}

export interface AppState extends State {
  app: App[] | null;
}

export interface UploadAppState extends State {
  app: App | null;
}

export interface GroupsState extends State {
  group: DevicesGroup[] | null;
}
