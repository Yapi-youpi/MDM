import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Roles } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public roles: Roles = {
    operator: 'Оператор',
    admin: 'Администратор',
    super: 'Суперадмин',
  };
  constructor(private storage: Storage) {
    this.storage.create().then();
  }

  setToStorage(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.storage
        .set(key, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getFromStorage(key: string) {
    return new Promise<string>((resolve, reject) => {
      this.storage
        .get(key)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  removeFromStorage(key: string) {
    return new Promise((resolve, reject) => {
      this.storage
        .remove(key)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  modalInit(id: string) {
    const modal = document.getElementById(id);
    const modalBtn = document.querySelector(`button[data-target='${id}']`);
    const closeBtn = document.querySelector('.modal-close');

    modalBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    function openModal() {
      if (modal) modal.classList.add('modal-wrapper--open');
    }

    function closeModal() {
      if (modal) modal.classList.remove('modal-wrapper--open');
    }

    function outsideClick(e) {
      if (e.target == modal) {
        if (modal) modal.classList.remove('modal-wrapper--open');
      }
    }
  }
}
