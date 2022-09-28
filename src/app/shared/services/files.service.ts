import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFileState, IState } from '../types/states';
import { environment } from '../../../environments/environment';
import { filePaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  upload(entity: 'device' | 'group', eID: string, file: FormData) {
    return new Promise<IFileState>((resolve, reject) => {
      this.http
        .post<IFileState>(
          environment.url +
            api.UPLOAD +
            (entity === 'device' ? api.DEVICE_FILE : api.GROUP_FILE) +
            '/' +
            eID,
          file
        )
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(entity: 'device' | 'group', eID: string, fID: string) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(
          environment.url +
            api.REMOVE +
            (entity === 'device' ? api.DEVICE_FILE : api.GROUP_FILE),
          entity === 'device'
            ? {
                deviceID: eID,
                fileID: fID,
              }
            : {
                groupID: eID,
                fileID: fID,
              }
        )
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
