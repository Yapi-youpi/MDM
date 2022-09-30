import { Component } from '@angular/core';
import { ConfigClass } from '../../../../../shared/classes/configs/config.class';

@Component({
  selector: 'app-delete-config',
  templateUrl: './delete-config.component.html',
  styleUrls: ['./delete-config.component.scss'],
})
export class DeleteConfigComponent {
  constructor(private config: ConfigClass) {}

  get _current() {
    return this.config.current;
  }

  onDeleteHandler() {
    if (this._current) {
      this.config.delete(this._current.ID).then((res) => {
        if (res) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#modal-delete-config');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
