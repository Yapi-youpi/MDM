import { Component } from '@angular/core';

import { AddAppService } from '../../../../../shared/services/forms/app/add-app.service';
import { AppClass, LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss'],
})
export class AddAppComponent {
  constructor(
    private form: AddAppService,
    private apps: AppClass,
    private loader: LoaderClass
  ) {}

  get loading$() {
    return this.loader.loading$;
  }

  get entity$() {
    return this.loader.entity$;
  }

  get _form() {
    return this.form.form;
  }

  get _file() {
    return this._form.get('file');
  }

  get _name() {
    return this._form.get('name');
  }

  // get _runAfterInstall() {
  //   return this._form.get('runAfterInstall');
  // }
  //
  // get _runAtBoot() {
  //   return this._form.get('runAtBoot');
  // }
  //
  // get _showIcon() {
  //   return this._form.get('showIcon');
  // }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  onInputFileChangeHandler(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this._file?.setValue(formData);
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      if (this.form._file) {
        this.apps.upload(this.form._file).then((res) => {
          if (res) {
            this.closeModal();
            this.form.resetForm();
          }
        });
      }
    }
  }

  onCancelHandler() {
    this.closeModal();
    this.form.resetForm();
  }

  closeModal() {
    const modal = document.querySelector('#add_app');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
