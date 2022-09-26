import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IApp } from '../../../../../shared/types/apps';
import { environment } from '../../../../../../environments/environment';
import { appsPaths as api } from '../../../../../shared/enums/api';

@Component({
  selector: 'app-add-app-to-config',
  templateUrl: './add-app-to-config.component.html',
  styleUrls: ['./add-app-to-config.component.scss'],
})
export class AddAppToConfigComponent implements OnChanges {
  @Input() apps: IApp[] = [];
  @Input() appsInConfig: string[] = [];
  @Input() isModalAddAppOpen!: boolean;

  @Output() onSubmit = new EventEmitter();

  public appGroups: IApp[] = [];
  public appsToAdd: string[] = [];
  public isSubmitted: boolean = false;
  public filter: string = 'all';
  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';

  constructor() {}

  ngOnChanges(changes) {
    // console.log(changes);
    for (let key in changes) {
      if (
        key === 'isModalAddAppOpen' &&
        changes.isModalAddAppOpen?.currentValue === true &&
        this.apps.length > 0
      ) {
        // КОПИПАСТА
        if (this.appGroups.length !== 0) this.appGroups = [];

        this.apps.forEach((a) => {
          if (a.ID === a.parentAppID)
            this.appGroups = [{ ...a, children: [] }, ...this.appGroups];
        });

        this.apps.forEach((a) => {
          if (a.parentAppID !== a.ID) {
            this.appGroups = this.appGroups.map((ag) => {
              if (a.parentAppID === ag.ID) {
                if (ag.children?.length === 0)
                  return {
                    ...ag,
                    children: [a, ...ag.children],
                  };
                else {
                  if (ag.children?.includes(a)) return ag;
                  else
                    return {
                      ...ag,
                      children: [a, ...ag.children],
                    };
                }
              } else return ag;
            });
          }
        });

        this.sortChildrenByVCode();

        this.appGroups = this.appGroups.map((ag) => {
          if (ag.children.length !== 0) {
            const head = { ...ag, children: [] };
            const tail = ag.children[0];

            return {
              ...tail,
              children: [...ag.children.filter((c) => c.ID !== tail.ID), head],
            };
          } else return ag;
        });
      }
    }
  }

  // КОПИПАСТА
  sortChildrenByVCode() {
    this.appGroups.map((a) => {
      return {
        ...a,
        children: a.children.sort(
          (aChild, bChild) => bChild.versionCode - aChild.versionCode
        ),
      };
    });
  }

  changeSearchParam(value: string) {
    this.searchParam = value;
  }

  setFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
  }

  onCheckboxChange(event) {
    if (event.target.checked) {
      if (!this.appsToAdd.includes(event.target.value))
        this.appsToAdd.push(event.target.value);
    } else {
      if (this.appsToAdd.includes(event.target.value))
        this.appsToAdd = this.appsToAdd.filter((a) => a !== event.target.value);
    }
  }

  checkSelectedValue(appID: string) {
    this.appsToAdd.map((id) => {
      this.apps.map((a) => {
        if (a.ID === id && a.ID === appID)
          this.appsToAdd = this.appsToAdd.filter((str) => str !== id);
      });
    });
  }

  checkAppsInConfig(newID) {
    let version = 0;

    this.apps.map((app) => {
      if (app.ID === newID) {
        version = app.versionCode;
      }
    });

    this.appsInConfig.map((id) => {
      this.apps.map((app) => {
        if (app.ID === id && app.ID === newID && app.versionCode >= version)
          this.appsToAdd = this.appsToAdd.filter((str) => str !== newID);
      });
    });
  }

  setValue(event) {
    const checkbox = event.target.parentNode.parentNode.querySelector(
      'input[type="checkbox"]'
    );

    if (checkbox) {
      checkbox.value = event.target.value;
      this.checkSelectedValue(checkbox.value);
      if (checkbox.checked) this.appsToAdd.push(event.target.value);
      this.checkAppsInConfig(event.target.value);
    }
  }

  resetForm() {
    this.appsToAdd = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="apps"]'
    );
    // @ts-ignore
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  onSubmitHandler() {
    this.onSubmit.emit(this.appsToAdd);
    this.onCancelHandler();
  }

  onCancelHandler() {
    this.resetForm();
    const modal = document.querySelector('#add_app_config');
    modal?.classList.toggle('hidden');
  }
}
