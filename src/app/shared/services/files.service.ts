import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFile, IFileState, IState } from '../types';
import { environment } from '../../../environments/environment';
import { filePaths as api } from '../enums/api';
import { alertService } from './index';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient, private alert: alertService) {}

  upload(entity: 'device' | 'group', eID: string, file: FormData) {
    return new Promise<IFile | null>((resolve, reject) => {
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
          next: (res) => {
            if (res.success) resolve(res.file);
            else {
              this.alert.show({
                title: 'Ошибка загрузки файла',
                content: res.error,
              });
              resolve(null);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(null);
          },
        });
    });
  }

  delete(entity: 'device' | 'group', eID: string, fID: string) {
    return new Promise<boolean>((resolve, reject) => {
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
          next: (res) => {
            if (res.success) resolve(true);
            else {
              this.alert.show({
                title: 'Ошибка удаления файла',
                content: res.error,
              });
              resolve(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.alert.show({
              title: err.name,
              content: err.message,
            });
            resolve(false);
          },
        });
    });
  }
}
