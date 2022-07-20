export interface Users {
  activeState: boolean;
  id: string;
  login: string;
  name: string;
  role: string;
  userTags: string[];
  groupsPermissions: GroupPermissions;
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
