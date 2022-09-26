export interface IFile {
  ABSPath: string;
  size: number;
  name: string;
  fileID: string;
  path: string;
  description: string;
  url: string;
  lastUpdate: number;
  checksum: string;
  remove: boolean;
  varContent: boolean;
  camData: boolean;
}
