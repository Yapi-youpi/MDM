import { IDevice } from './devices';
import { IGroup } from './groups';
import { IApp } from './apps';
import { IFile } from './files';
import { IMessage } from './message';

export interface IState {
  success: boolean;
  error: string;
}

export interface IUserState extends IState {
  id: string;
  token: string;
}

// export interface IConfigsState extends IState {
//   devicesConfigs: IConfig[] | null;
// }

export interface IGroupState extends IState {
  group: IGroup[] | null;
}
export interface IGroupsState extends IState {
  devicesGroups: IGroup[] | null;
}

export interface IDeviceState extends IState {
  device: IDevice | null;
}
export interface IDevicesState extends IState {
  devices: IDevice[] | null;
}

export interface IAppState extends IState {
  app: IApp | null;
}
export interface IAppsState extends IState {
  app: IApp[] | null;
}

export interface IFileState extends IState {
  file: IFile;
}

export interface IMessagesState extends IState {
  messages: IMessage[];
}
