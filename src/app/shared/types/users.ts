export interface IUser {
  avatar: string;
  activeState: boolean;
  id: string;
  login: string;
  name: string;
  role: string;
  userTags: string[];
  groupsPermissions: IGroupPermissions;
}
export interface IRoles {
  [key: string]: { text: string; color: string };
}
export interface IPermissions {
  [key: string]: string;
}
export interface IGroupPermissions {
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
