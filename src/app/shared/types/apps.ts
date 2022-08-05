export interface App {
  ID: string;
  parentAppID: string;
  configID: string;
  fileName: string;
  localPath: string;
  pkg: string;
  name: string;
  url: string;
  version: string;
  versionCode: number;
  arch: string;
  latestVersion: string;
  iconText: string;
  iconPath: string;
  iconUID: string;
  fileSize: string;
  fileByteSize: number;
  showIcon: boolean;
  availableInStorage: boolean;
  useKiosk: boolean;
  system: boolean;
  runAfterInstall: boolean;
  runAtBoot: boolean;
  skipVersion: boolean;
  screenOrder: number;
  bottom: boolean;

  children: App[];
}

// export interface UploadedApp {
//   appID: string
//   appName: string
//   arch: string
//   fileByteSize: number
//   fileName: string
//   fileSize: string
//   iconUID: string
//   parentAppID: string
//   pkg: string
//   version: string
//   versionCode: number
// }
