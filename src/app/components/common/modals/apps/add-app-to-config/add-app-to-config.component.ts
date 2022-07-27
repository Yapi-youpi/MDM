import { Component, EventEmitter, Input, Output } from '@angular/core';
import { App } from '../../../../../shared/types/apps';
import { environment } from '../../../../../../environments/environment';
import { appsPaths as api } from '../../../../../shared/enums/api';

@Component({
  selector: 'app-add-app-to-config',
  templateUrl: './add-app-to-config.component.html',
  styleUrls: ['./add-app-to-config.component.scss'],
})
export class AddAppToConfigComponent {
  @Input() apps: App[] = [];
  @Input() appsInConfig: string[] = [];

  public addedApps: string[] = [];
  public isSubmitted: boolean = false;
  public url: string = environment.url + api.GET_ICON;

  @Output() onSubmit = new EventEmitter();
  constructor() {}

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.addedApps.push(event.target.value);
    } else {
      this.addedApps = this.addedApps.filter((i) => i !== event.target.value);
    }
  }

  onSubmitHandler() {
    this.onSubmit.emit(this.addedApps);
    this.onCancelHandler();
  }

  resetForm() {
    this.addedApps = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="apps"]'
    );
    // @ts-ignore
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  onCancelHandler() {
    this.resetForm();
    const modal = document.querySelector('#add_app_config');
    modal?.classList.toggle('hidden');
  }
}
