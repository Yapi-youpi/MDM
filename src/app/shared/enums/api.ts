export enum EAuth {
  SING_IN = '/login',
  SING_OUT = '/logout',
}

export enum EDevices {
  ADD = '/add_device',
  GET = '/get_device/',
  REMOVE = '/remove_device',
  EDIT = '/edit_device',
  REBOOT = '/reboot_device',
}

export enum EApps {
  GET = '/get_app/',
  UPLOAD = '/upload_file',
  GET_ICON = '/get_icon_by_app_id/',
  EDIT = '/edit_app',
  DELETE = '/delete_app',
  ADD_TO_INST = '/config_add_app_to_install',
  REMOVE_FROM_INST = '/config_remove_app_from_install',
}

export enum EGroups {
  GET = '/get_device_group/',
  ADD = '/add_device_group',
  // CHANGE_STATE = '/change_active_state_device_group',
  // EDIT = '/edit_device_group',
  EDIT_SEVERAL = '/edit_device_groups',
  DELETE = '/remove_device_group',
  DELETE_WITH_DEVICES = '/remove_device_group_and_all_devices',
  DELETE_SEVERAL = '/remove_device_groups_and_all_devices',
}

export enum EConfigs {
  GET = '/get_config/',
  ADD = '/add_config',
  EDIT = '/edit_config',
  RENAME = '/rename_config',
  DELETE = '/remove_config',
  GET_RESTRICTIONS = '/get_default_restrictions',
  UPLOAD_WP = '/upload_wallpaper',
  REMOVE_WP = '/remove_wallpaper',
}

export enum EFiled {
  UPLOAD = '/upload_',
  REMOVE = '/remove_',
  DEVICE_FILE = 'device_file',
  GROUP_FILE = 'group_file',
}

export enum EUsers {
  CHANGE_MY_PASS = '/change_password',
  CHANGE_PASS = '/change_user_password',
  DELETE = '/delete_user',
  GET = '/get_user/',
  SIGN_UP = '/register',
  RENAME = '/rename_user',
  LOAD_AVATAR = '/load_avatar',
  EDIT_TAG = '/edit_user_tag',
  DELETE_TAG = '/delete_tag',
  GET_TAGS = '/get_user_tags',
  GET_PERMISSIONS = '/super/get_all_permissions',
  EDIT_PERMISSIONS = '/super/edit_permissions',
}

export enum EMessages {
  GET = '/pager/get_messages',
  SEND = '/pager/send_to/',
}
