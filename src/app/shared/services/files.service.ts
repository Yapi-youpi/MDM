import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { devicesPaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

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
