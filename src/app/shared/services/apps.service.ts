import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { appsPaths as api } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class AppsService {
  constructor(private http: HttpClient) {}

  get(param: string) {
    let url = environment.url + api.GET + param;
    console.log(url);

    return new Promise<any>((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res) => resolve(res),
        error: (res) => reject(res),
      });
    });
  }
}
