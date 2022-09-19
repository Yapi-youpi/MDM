import { Injectable } from '@angular/core';
import { CFile, IFile } from '../../types/files';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { groupsPaths as api } from '../../enums/api';

@Injectable({
  providedIn: 'root',
})
export class GroupsFilesService implements CFile {
  constructor(private http: HttpClient) {}

  upload(
    groupID: string,
    file: FormData
  ): Promise<{ success: boolean; error: string; file: IFile }> {
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
        }>(environment.url + api.UPLOAD_FILE + groupID, file)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
        });
    });
  }

  delete(
    groupID: string,
    fileID: string
  ): Promise<{ success: boolean; error: string }> {
    return new Promise<{ success: boolean; error: string }>(
      (resolve, reject) => {
        this.http
          .post<{ success: boolean; error: string }>(
            environment.url + api.DELETE_FILE,
            {
              groupID: groupID,
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
