import { Component, EventEmitter, Output } from "@angular/core";

import { AddAppService } from "../../../../../shared/services/forms/app/add-app.service";

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss']
})
export class AddAppComponent {
  @Output() onSubmit = new EventEmitter();

  constructor(private form: AddAppService) {}

  get _form() {
    return this.form.form;
  }

  get _file() {
    return this._form.get('file');
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  onInputFileChangeHandler(file: File) {
    const formData = new FormData();
    formData.append('file', file)

    this._file?.setValue(formData);
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onCancelHandler() {
    this.form.resetFormSubmitted();
    this.form.resetForm();

    const modal = document.querySelector("#add_app");
    modal?.classList.toggle("hidden");
  }
}
