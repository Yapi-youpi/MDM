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

export interface CFile {
  upload(
    entityID: string,
    file: FormData
  ): Promise<{
    success: boolean;
    error: string;
    file: IFile;
  }>;

  delete(
    entityID: string,
    fileID: string
  ): Promise<{ success: boolean; error: string }>;
}
