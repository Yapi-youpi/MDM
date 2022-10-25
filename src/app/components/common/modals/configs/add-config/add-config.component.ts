import { Component } from '@angular/core';
import { ConfigClass } from '../../../../../shared/classes/configs/config.class';
import { add } from '../../../../../shared/services/forms/configs';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss'],
})
export class AddConfigComponent {
  constructor(private config: ConfigClass, private form: add) {}

  get _form() {
    return this.form.form;
  }

  get _configs() {
    return this.config.array;
  }

  get _default() {
    return this.config.default;
  }

  onSubmitHandler() {
    if (this.form.values) {
      const name = this.form.values.name;
      const description = this.form.values.description;
      const config = this.form.values.prototype;

      if (this._default) {
        const prototype =
          config === 'Стандартная конфигурация'
            ? this._default
            : this._configs.find((conf) => conf.name === config);

        if (prototype)
          this.config.add(prototype, name, description).then((res) => {
            if (res) this.closeModal();
          });
      }
    }
  }

  onCloseHandler() {
    this.form.reset();
    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('#modal-add-config');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
