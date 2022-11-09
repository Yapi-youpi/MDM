import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  constructor(private _storage: Storage) {
    this._storage.create().then();
  }

  set(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this._storage
        .set(key, value)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  get(key: string) {
    return new Promise<string>((resolve, reject) => {
      this._storage
        .get(key)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  delete(key: string) {
    return new Promise((resolve, reject) => {
      this._storage
        .remove(key)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
