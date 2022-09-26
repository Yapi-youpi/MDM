import { Injectable } from '@angular/core';
import { IFile } from '../../types/files';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { groupsPaths as api } from '../../enums/api';
import { IFileState, IState } from '../../types/states';

@Injectable({
  providedIn: 'root',
})
export class GroupsFilesService {
  constructor(private http: HttpClient) {}

  upload(groupID: string, file: FormData) {
    return new Promise<IFileState>((resolve, reject) => {
      this.http
        .post<IFileState>(environment.url + api.UPLOAD_FILE + groupID, file)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(groupID: string, fileID: string) {
    return new Promise<IState>((resolve, reject) => {
      this.http
        .post<IState>(environment.url + api.DELETE_FILE, {
          groupID: groupID,
          fileID: fileID,
        })
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }
}
