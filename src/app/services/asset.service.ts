import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private storage: Storage) {
    this.storage.create().then();
  }

  setToStorage(key: string, value: string) {
    return new Promise((resolve) => {
      this.storage.set(key, value).then((res) => {
        resolve(res);
      });
    });
  }
  getFromStorage(key: string) {
    return new Promise<string>((resolve) => {
      this.storage.get(key).then((res) => {
        resolve(res);
      });
    });
  }
  removeFromStorage(key: string) {
    return new Promise((resolve)=>{
      this.storage.remove(key).then((res)=>{
        resolve(res)
      })
    })
  }
}
