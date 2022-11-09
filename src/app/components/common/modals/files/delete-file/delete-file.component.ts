import { Component, Input } from '@angular/core';
import { FileClass } from '../../../../../shared/classes/files/file.class';
import { FileLoaderClass } from '../../../../../shared/classes/files/file-loader.class';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.scss'],
})
export class DeleteFileComponent {
  @Input() source: 'device' | 'group' = 'device';

  constructor(
    private loader: FileLoaderClass,
    private files: FileClass,
    private device: DeviceClass,
    private group: GroupClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _file() {
    return this.files.current;
  }

  onSubmitHandler() {
    if (this.source === 'device') {
      const device = this.device.current;
      const file = this._file;

      if (device && file) {
        this.files
          .delete('device', device.device_id, file.fileID)
          .then((res) => {
            if (res) {
              this.closeModal();
            }
          });
      }
    }

    if (this.source === 'group') {
      const group = this.group.current;
      const file = this._file;

      if (group && file) {
        this.files.delete('group', group.id, file.fileID).then((res) => {
          if (res) {
            this.closeModal();
          }
        });
      }
    }
  }

  closeModal() {
    const modal = document.querySelector('#file_delete');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
