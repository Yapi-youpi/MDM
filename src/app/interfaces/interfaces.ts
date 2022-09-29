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
