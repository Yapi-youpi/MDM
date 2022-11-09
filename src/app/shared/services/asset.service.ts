import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRoles } from '../types/users';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public roles: IRoles = {
    operator: { text: 'Оператор', color: '#AFBBC4' },
    admin: { text: 'Администратор', color: '#67687C' },
    super: { text: 'Суперадмин', color: '#3E405F' },
  };
  public configName = '';
  constructor(private storage: Storage) {
    this.storage.create().then();
  }

  setToStorage(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.storage
        .set(key, value)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  getFromStorage(key: string) {
    return new Promise<string>((resolve, reject) => {
      this.storage
        .get(key)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  removeFromStorage(key: string) {
    return new Promise((resolve, reject) => {
      this.storage
        .remove(key)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
