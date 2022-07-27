import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { App } from '../../../../../shared/types/apps';

@Component({
  selector: 'app-add-app-to-config',
  templateUrl: './add-app-to-config.component.html',
  styleUrls: ['./add-app-to-config.component.scss'],
})
export class AddAppToConfigComponent implements OnInit {
  @Input() apps: App[] = [];
  public addedApps: string[] = [];
  public isSubmitted: boolean = false;
  @Output() onSubmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

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
