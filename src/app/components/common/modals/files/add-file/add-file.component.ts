import { Component, EventEmitter, Input, Output } from '@angular/core';
import { add } from '../../../../../shared/services/forms/file';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent {
  @Input() source: 'device' | 'group' = 'device';

  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor(private form: add) {}

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

    const modal = document.querySelector('#file_add');
    modal?.classList.toggle('hidden');
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }
}
