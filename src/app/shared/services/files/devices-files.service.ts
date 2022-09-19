import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { devicesPaths as api } from '../../enums/api';
import { CFile, IFile } from '../../types/files';

@Injectable({
  providedIn: 'root',
})
export class DevicesFilesService implements CFile {
  constructor(private http: HttpClient) {}

  upload(deviceID: string, file: FormData) {
    return new Promise<{
      success: boolean;
      error: string;
      file: IFile;
    }>((resolve, reject) => {
      this.http
        .post<{
          success: boolean;
          error: string;
          file: IFile;
        }>(environment.url + api.UPLOAD_FILE + deviceID, file)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(deviceID: string, fileID: string) {
    return new Promise<{ success: boolean; error: string }>(
      (resolve, reject) => {
        this.http
          .post<{ success: boolean; error: string }>(
            environment.url + api.DELETE_FILE,
            {
              deviceID: deviceID,
              fileID: fileID,
            }
          )
          .subscribe({
            next: (res) => resolve(res),
            error: (err) => reject(err),
          });
      }
    );
  }
}
