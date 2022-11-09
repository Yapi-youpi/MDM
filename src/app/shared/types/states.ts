import { IDevice } from './devices';
import { IGroup } from './groups';
import { IApp } from './apps';
import { IFile } from './files';
import { IConfig } from './config';
import { IGroupPermissions, IUser } from './users';

export interface IState {
  success: boolean;
  error: string;
}

export interface IUserState extends IState {
  id: string;
  token: string;
}
export interface IUsersState extends IState {
  users: IUser[];
}
export interface IUserTagsState extends IState {
  userTags: string[];
}
export interface IGroupPermissionsState extends IState {
  permissions: IGroupPermissions[];
}
export interface IRegisterState extends IState {
  login: string;
  name: string;
  role: string;
  avatar: string;
}

export interface IConfigsState extends IState {
  devicesConfigs: IConfig[] | null;
}

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
