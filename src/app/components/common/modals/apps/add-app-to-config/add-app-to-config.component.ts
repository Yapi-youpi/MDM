import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { App } from '../../../../../shared/types/apps';
import { environment } from '../../../../../../environments/environment';
import { appsPaths as api } from '../../../../../shared/enums/api';

interface AppsGroup {
  [name: string]: App[];
}

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
  public url: string = environment.url + api.GET_ICON;

  @Output() onSubmit = new EventEmitter();

  constructor() {}

  ngOnChanges(changes) {
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
          console.log(this.appsGroup[key]);
        }
        // console.log(this.appGroups);
      }
    }
  }
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      if (!this.addedApps.includes(event.target.value)) {
        //TODO check if array already has this app, replace older version

        /*
        this.apps.map((app) => {
          if (app.ID === event.target.value) {
            const newID = event.target.value;
            this.appsInConfig.map((id) => {
              if (app.ID === id) {
                const oldID = id;
              }
            });
          }
        });
*/

        this.addedApps.push(event.target.value);
      }
    } else {
      this.addedApps = this.addedApps.filter((i) => i !== event.target.value);
    }
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
