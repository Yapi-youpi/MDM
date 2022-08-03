export interface App {
  ID: string;
  configID: string;
  fileName: string;
  localPath: string;
  pkg: string;
  name: string;
  url: string;
  version: string;
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
}
