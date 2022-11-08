import { Component, Input } from '@angular/core';
import { add } from '../../../../../shared/services/forms/file';
import {
  DeviceClass,
  FileClass,
  LoaderClass,
} from '../../../../../shared/classes';
import { GroupClass } from '../../../../../shared/classes/groups/group.class';

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
    private files: FileClass,
    private _loader: LoaderClass
  ) {}

  get loading$() {
    return this._loader.loading$;
  }

  get entity$() {
    return this._loader.entity$;
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
