import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root',
})
export class PagerService {
  constructor(private http: HttpClient) {}

  sendMessage(id: string, message: string, param: string) {
    const url = environment.url + '/pager/send_to/' + param;
    const body = {
      id,
      message,
    };
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(url, body).subscribe({
        next: (res: { success: boolean; error: string } | any) => {
          resolve(res.success);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getMessages() {
    const url = environment.url + '/pager/get_messages';
    return new Promise<Message[]>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res: { messages: Message[] } | any) => {
          resolve(res.messages);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
