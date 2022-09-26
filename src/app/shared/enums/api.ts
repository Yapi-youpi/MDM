export enum devicesPaths {
  ADD = '/add_device',
  GET = '/get_device/',
  REMOVE = '/remove_device',
  EDIT = '/edit_device',
  REBOOT = '/reboot_device',
  UPLOAD_FILE = '/upload_device_file/',
  DELETE_FILE = '/remove_device_file',
}

export enum appsPaths {
  GET = '/get_app/',
  UPLOAD = '/upload_file',
  GET_ICON = '/get_icon_by_app_id/',
  EDIT = '/edit_app',
  DELETE = '/delete_app',
  ADD_TO_INST = '/config_add_app_to_install',
  REMOVE_FROM_INST = '/config_remove_app_from_install',
}

export enum groupsPaths {
  GET = '/get_device_group/',
  ADD = '/add_device_group',
  // CHANGE_STATE = '/change_active_state_device_group',
  // EDIT = '/edit_device_group',
  EDIT_SEVERAL = '/edit_device_groups',
  DELETE = '/remove_device_group',
  DELETE_WITH_DEVICES = '/remove_device_group_and_all_devices',
  DELETE_SEVERAL = '/remove_device_groups_and_all_devices',
  UPLOAD_FILE = '/upload_group_file/',
  DELETE_FILE = '/remove_group_file',
}

export enum configsPaths {
  GET = '/get_config/',
  ADD = '/add_config',
  EDIT = '/edit_config',
  RENAME = '/rename_config',
  DELETE = '/remove_config',
  GET_RESTRICTIONS = '/get_default_restrictions',
  UPLOAD_WP = '/upload_wallpaper',
  REMOVE_WP = '/remove_wallpaper',
}
