import { Component, Input } from '@angular/core';
import { DeviceSelectedClass } from '../../../shared/classes/devices/device-selected.class';
import { GroupSelectedClass } from '../../../shared/classes/groups/group-selected.class';

@Component({
  selector: 'app-selected-elements',
  templateUrl: './selected-elements.component.html',
  styleUrls: ['./selected-elements.component.scss'],
})
export class SelectedElementsComponent {
  @Input() source: 'device' | 'group' = 'device';

  @Input() editTarget: string = '';
  @Input() deleteTarget: string = '';

  constructor(
    private dSelected: DeviceSelectedClass,
    private gSelected: GroupSelectedClass
  ) {}

  get _dSelectedIDs() {
    return this.dSelected.selectedIDs;
  }

  get _gSelectedIDs() {
    return this.gSelected.selectedIDs;
  }

  onCloseClickHandler() {
    if (this.source === 'device') {
      this.dSelected.cancelSelection();
    }

    if (this.source === 'group') {
      this.gSelected.cancelSelection();
    }
  }

  onEditClickHandler() {
    const modal = document.querySelector(`#${this.editTarget}`);
    modal?.classList.toggle('hidden');
  }

  onDeleteClickHandler() {
    const modal = document.querySelector(`#${this.deleteTarget}`);
    modal?.classList.toggle('hidden');
  }
}
