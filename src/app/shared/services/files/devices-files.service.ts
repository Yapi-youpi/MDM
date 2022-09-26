import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { devicesPaths as api } from '../../enums/api';
import { IFile } from '../../types/files';
import { IFileState, IState } from '../../types/states';

@Injectable({
  providedIn: 'root',
})
export class DevicesFilesService {
  constructor(private http: HttpClient) {}

  upload(deviceID: string, file: FormData) {
    return new Promise<IFileState>((resolve, reject) => {
      this.http
        .post<IFileState>(environment.url + api.UPLOAD_FILE + deviceID, file)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(deviceID: string, fileID: string) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.DELETE_FILE, {
          deviceID: deviceID,
          fileID: fileID,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
