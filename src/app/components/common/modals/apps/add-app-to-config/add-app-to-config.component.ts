import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { appsPaths as api } from '../../../../../shared/enums/api';
import { AppClass, AppSelectedClass } from '../../../../../shared/classes';
import { IApp } from '../../../../../shared/types';

@Component({
  selector: 'app-add-app-to-config',
  templateUrl: './add-app-to-config.component.html',
  styleUrls: ['./add-app-to-config.component.scss'],
})
export class AddAppToConfigComponent implements OnChanges {
  @Input() appsInConfig: string[] = [];
  @Input() isModalAddAppOpen!: boolean;

  @Output() onSubmit = new EventEmitter();

  public isSubmitted: boolean = false;
  public filter: string = 'all';
  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';

  constructor(
    private _elRef: ElementRef,
    private _apps: AppClass,
    private _appsSelected: AppSelectedClass
  ) {}

  get rawApps() {
    return this._apps.rawApps;
  }

  get groupedApps() {
    return this._apps.groupedApps;
  }

  ngOnChanges(changes) {
    for (let key in changes) {
      if (
        key === 'isModalAddAppOpen' &&
        changes.isModalAddAppOpen?.currentValue === true &&
        this.rawApps.length > 0
      ) {
        this._apps.get('all').then();
      }
    }
  }

  changeSearchParam(value: string) {
    this.searchParam = value;
  }

  setFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
  }

  checkIfExistsInList(group: IApp) {
    return this._appsSelected.checkIfExistsInList(group);
  }

  onCheckboxChange(group: IApp, event) {
    const check = !event; // потому что берется предыдущее значение
    const select = this._elRef.nativeElement.querySelector(
      `#version-${group.ID}`
    );

    if (!select) {
      this._appsSelected.setElementSelection(group);
      if (check)
        this._appsSelected.checkAppsInConfig(this.appsInConfig, group.ID);
    } else {
      const value = select.value;

      if (value === group.ID) {
        this._appsSelected.setElementSelection(group);
        if (check)
          this._appsSelected.checkAppsInConfig(this.appsInConfig, group.ID);
      } else {
        this._appsSelected.setElementSelection(group, false, check, value);
      }
    }
  }

  swapIDsInListOfSelected(event: Event, group: IApp) {
    const checkbox = (
      event.target as HTMLSelectElement
    )?.parentNode?.parentNode?.querySelector(
      'input[type="checkbox"]'
    ) as unknown as HTMLInputElement;

    if (checkbox) {
      const id = (event.target as HTMLSelectElement).value;

      this._appsSelected.swapIDs(group, id);

      this._appsSelected.checkAppsInConfig(this.appsInConfig, id);
    }
  }

  resetForm() {
    this._appsSelected.setListOfSelected([]);
  }

  onSubmitHandler() {
    this.onSubmit.emit(this._appsSelected.selectedIDs);
    this.onCancelHandler();
  }

  onCancelHandler() {
    this.resetForm();
    const modal = document.querySelector('#add_app_config');
    modal?.classList.toggle('hidden');
  }
}
