import { Component } from '@angular/core';

import { EditAppService } from '../../../../../shared/services/forms/app/edit-app.service';
import { AppClass, LoaderClass } from '../../../../../shared/classes';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss'],
})
export class EditAppComponent {
  constructor(
    private form: EditAppService,
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

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  // get _system() {
  //   return this._form.get('system');
  // }

  get _name() {
    return this._form.get('name');
  }

  get _runAfterInstall() {
    return this._form.get('runAfterInstall');
  }

  get _runAtBoot() {
    return this._form.get('runAtBoot');
  }

  // get _showIcon() {
  //   return this._form.get('showIcon');
  // }
  //
  // toggleSystemView() {
  //   this._form.controls['system'].setValue(!this._system?.value);
  // }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      if (this.apps.current && this.form.values)
        this.apps.edit(this.apps.current.ID, this.form.values).then((res) => {
          if (res) {
            this.closeModal();
          }
        });
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#edit_app');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
