import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRoles } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public roles: IRoles = {
    operator: { text: 'Оператор', color: '#AFD9A1' },
    admin: { text: 'Администратор', color: '#557EBE' },
    super: { text: 'Суперадмин', color: '#2F4459' },
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
