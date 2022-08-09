import { Component, EventEmitter, Input, Output } from '@angular/core';

import { App } from '../../../../../shared/types/apps';

import { EditAppService } from '../../../../../shared/services/forms/app/edit-app.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss'],
})
export class EditAppComponent {
  @Input() app!: App;
  @Input() isDataFetching: boolean = false;

  @Output() onSubmit = new EventEmitter();

  constructor(private form: EditAppService) {}

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _system() {
    return this._form.get('system');
  }

  get _name() {
    return this._form.get('name');
  }

  get _runAfterInstall() {
    return this._form.get('runAfterInstall');
  }

  get _runAtBoot() {
    return this._form.get('runAtBoot');
  }

  get _showIcon() {
    return this._form.get('showIcon');
  }

  toggleSystemView() {
    this._form.controls['system'].setValue(!this._system?.value);
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this._form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();

    const modal = document.querySelector('#edit_app');
    modal?.classList.toggle('hidden');
  }
}
