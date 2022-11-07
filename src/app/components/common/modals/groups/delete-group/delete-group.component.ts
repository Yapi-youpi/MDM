import { Component } from '@angular/core';
import { GroupClass, LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent {
  constructor(private group: GroupClass, private _loader: LoaderClass) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  get _group() {
    return this.group.current;
  }

  onSubmitHandler() {
    if (this._group) {
      this.group.delete([this._group], true).then((res) => {
        if (res) {
          // todo: unselect in in selectedlist
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#delete_group');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
