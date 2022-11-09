import { Component } from '@angular/core';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { GroupLoaderClass } from '../../../../../shared/classes/groups/group-loader.class';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss'],
})
export class DeleteGroupComponent {
  constructor(private group: GroupClass, private loader: GroupLoaderClass) {}

  get _loading() {
    return this.loader.loading;
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
