import { Component, Input } from '@angular/core';
import { add } from '../../../../../shared/services/forms/file';
import { DeviceClass } from '../../../../../shared/classes/devices/device.class';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';
import { FileClass } from '../../../../../shared/classes/files/file.class';
import { FileLoaderClass } from '../../../../../shared/classes/files/file-loader.class';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent {
  @Input() source: 'device' | 'group' = 'device';

  constructor(
    private form: add,
    private device: DeviceClass,
    private group: GroupClass,
    private loader: FileLoaderClass,
    private files: FileClass
  ) {}

  get _loading() {
    return this.loader.loading;
  }

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _file() {
    return this._form.get('file');
  }

  onInputFileChangeHandler(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._file?.setValue(formData);
  }

  onCancelHandler() {
    this.form.resetForm();

    this.closeModal();
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      if (this.source === 'device') {
        const device = this.device.current;
        if (device) {
          this.files
            .upload('device', device.device_id, this.form._file)
            .then((res) => {
              if (res) {
                this.form.resetForm();
                this.closeModal();
              }
            });
        }
      }
      if (this.source === 'group') {
        const group = this.group.current;
        if (group) {
          this.files.upload('group', group.id, this.form._file).then((res) => {
            if (res) {
              this.form.resetForm();
              this.closeModal();
            }
          });
        }
      }
    }
  }

  closeModal() {
    const modal = document.querySelector('#file_add');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
