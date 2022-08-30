import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
}
