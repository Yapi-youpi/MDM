import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { App, AppsGroup } from '../../../../../shared/types/apps';
import { environment } from '../../../../../../environments/environment';
import { appsPaths as api } from '../../../../../shared/enums/api';
// import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-app-to-config',
  templateUrl: './add-app-to-config.component.html',
  styleUrls: ['./add-app-to-config.component.scss'],
})
export class AddAppToConfigComponent implements OnChanges {
  @Input() apps: App[] = [];
  @Input() appsInConfig: string[] = [];
  @Input() isModalAddAppOpen!: boolean;

  public appsGroup: AppsGroup = {};
  public addedApps: string[] = [];
  public isSubmitted: boolean = false;
  public filter: string = 'all';
  // public filterForm: FormGroup;
  public url: string = environment.url + api.GET_ICON;

  @Output() onSubmit = new EventEmitter();

  constructor() {
    // this.filterForm = new FormGroup({
    //   dateTo: new FormControl(''),
    // });
  }

  ngOnChanges(changes) {
    // console.log(changes);
    for (let key in changes) {
      if (
        key === 'isModalAddAppOpen' &&
        changes.isModalAddAppOpen?.currentValue === true &&
        this.apps.length > 0
      ) {
        // get unique app's names
        let groups = Array.from(new Set(this.apps.map((i) => i.name)));
        // create obj with key of unique names
        groups.map((element) => {
          this.appsGroup[element] = [];
        });
        // push apps to obj
        this.apps.map((app) => {
          if (groups.includes(app.name)) {
            this.appsGroup[app.name].push(app);
          }
        });
        // sort apps by value
        for (let key in this.appsGroup) {
          this.appsGroup[key].sort((a, b) => b.versionCode - a.versionCode);
        }
      }
    }
  }

  setFilter(event: Event) {
    // @ts-ignore
    this.filter = event.target!.value;
    // @ts-ignore
    console.log(event.target!.value);
  }

  onCheckboxChange(event, appName) {
    if (event.target.checked) {
      if (!this.addedApps.includes(event.target.value)) {
        this.checkSelectedValue(appName);
        this.addedApps.push(event.target.value);
        this.checkAppsInConfig(appName, event.target.value);
      }
    } else {
      this.checkSelectedValue(appName);
    }
  }

  checkSelectedValue(appName) {
    this.addedApps.map((id) => {
      this.apps.map((app) => {
        if (app.ID === id && app.name === appName) {
          this.addedApps = this.addedApps.filter((i) => i !== id);
        }
      });
    });
  }

  checkAppsInConfig(appName, newID) {
    let version = 0;

    this.apps.map((app) => {
      if (app.ID === newID) {
        version = app.versionCode;
      }
    });

    this.appsInConfig.map((id) => {
      this.apps.map((app) => {
        if (
          app.ID === id &&
          app.name === appName &&
          app.versionCode >= version
        ) {
          this.addedApps = this.addedApps.filter((i) => i !== newID);
        }
      });
    });
  }

  onSubmitHandler() {
    this.onSubmit.emit(this.addedApps);
    this.onCancelHandler();
  }

  setValue(event) {
    const checkbox = event.target.parentNode.parentNode.querySelector(
      'input[type="Checkbox"]'
    );

    if (checkbox) {
      checkbox.value = event.target.value;
      this.checkSelectedValue(checkbox.id);
      if (checkbox.checked) this.addedApps.push(event.target.value);
      this.checkAppsInConfig(checkbox.id, event.target.value);
    }
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
