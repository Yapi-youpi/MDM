import { Component, Input } from '@angular/core';
import { DeviceClass } from '../../../../shared/classes/devices/device.class';
import { GroupClass } from '../../../../shared/classes/groups/group.class';
import { DeviceSelectedClass } from '../../../../shared/classes/devices/device-selected.class';
import { GroupSelectedClass } from '../../../../shared/classes/groups/group-selected.class';
import { IGroup } from '../../../../shared/types';
import { LoaderClass } from '../../../../shared/classes';

@Component({
  selector: 'app-delete-several-elements',
  templateUrl: './delete-several-elements.component.html',
  styleUrls: ['./delete-several-elements.component.scss'],
})
export class DeleteSeveralElementsComponent {
  @Input() public source: 'device' | 'group' = 'device';

  constructor(
    private devices: DeviceClass,
    private dSelected: DeviceSelectedClass,
    private groups: GroupClass,
    private gSelected: GroupSelectedClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
  }

  onSubmitHandler() {
    if (this.source === 'device') {
      this.devices.delete(this.dSelected.selectedIDs).then((res) => {
        if (res) {
          this.dSelected.cancelSelection();
          this.closeModal();
        }
      });
    }
    if (this.source === 'group') {
      const groups: IGroup[] = this.groups.array
        .filter((g) => this.gSelected.selectedIDs.includes(g.id))
        .map((g) => ({ id: g.id } as unknown as IGroup));

      this.groups.delete(groups).then((res) => {
        if (res) {
          this.gSelected.cancelSelection();
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#delete_several_elements');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
