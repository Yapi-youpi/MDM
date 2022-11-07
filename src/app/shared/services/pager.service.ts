import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IMessage, IState } from '../types';
import { alertService } from './index';
import { messagesPaths as api } from '../enums/api';

@Injectable({
  providedIn: 'root',
})
export class PagerService {
  constructor(private http: HttpClient, private alert: alertService) {}

  get() {
    return new Promise<IMessage[] | null>((resolve) => {
      this.http
        .get<{ messages: IMessage[] | null }>(environment.url + api.GET)
        .subscribe({
          next: (res) => {
            if (res) resolve(res.messages);
            else {
              this.alert.show({
                title: 'Ошибка получения сообщений',
                content: '',
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

  send(id: string, message: string, param: string) {
    return new Promise<boolean>((resolve) => {
      this.http
        .post<IState>(environment.url + api.SEND + param, {
          id,
          message,
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.alert.show({
                type: 'success',
                title: 'УСПЕШНО',
                content: 'Сообщение отправлено',
              });
              resolve(true);
            } else {
              this.alert.show({
                title: 'Ошибка отправки сообщения',
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
