import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Roles } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public roles: Roles = {
    operator: { text: 'Оператор', color: '#AFD9A1' },
    admin: { text: 'Администратор', color: '#557EBE' },
    super: { text: 'Суперадмин', color: '#2F4459' },
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
    const modalBtn = document.querySelectorAll(`button[data-target='${id}']`);
    const closeBtn = document.querySelectorAll('.modal-close');

    modalBtn?.forEach((btn) => btn.addEventListener('click', openModal));
    closeBtn?.forEach((btn) => btn.addEventListener('click', closeModal));
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
  filterInit(id: string) {
    const filter = document.getElementById(id);
    const openBtn = document.querySelectorAll(`button[data-target='${id}']`);
    const closeBtn = document.querySelectorAll('.filter-close');

    openBtn?.forEach((btn) => btn.addEventListener('click', openFilter));
    closeBtn?.forEach((btn) => btn.addEventListener('click', closeFilter));
    window.addEventListener('click', outsideClick);

    function openFilter(e) {
      e.stopPropagation();
      if (filter) filter.classList.add('filter--open');
    }

    function closeFilter() {
      if (filter) filter.classList.remove('filter--open');
    }

    function outsideClick(e) {
      if (e.target == filter) {
        if (filter) filter.classList.remove('filter--open');
      }
    }
  }
}
