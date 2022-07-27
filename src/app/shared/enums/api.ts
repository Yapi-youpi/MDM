export enum devicesPaths {
  ADD = "/add_device",
  GET = "/get_device/",
  REMOVE = "/remove_device",
  EDIT = "/edit_device",
}

export enum appsPaths {
  GET = "/get_app/",
  UPLOAD = "/upload_file",
  GET_ICON = "/get_icon_by_app_id/",
  EDIT = "/edit_app",
  DELETE = "/delete_app",
}

export enum groupsPaths {
  GET = "/get_device_group/",
  ADD = "/add_device_group",
  CHANGE_STATE = "/change_active_state_device_group",
  DELETE = "/remove_device_group",
  RENAME = "/rename_device_group",
  DELETE_WITH_DEVICES = "/remove_device_group_and_all_devices",
}

export enum configsPaths {
  GET = "/get_config/",
  ADD = "/add_config",
  RENAME = "/rename_config",
  DELETE = "/remove_config",
}
