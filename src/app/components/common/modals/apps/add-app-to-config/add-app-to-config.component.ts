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
import { AppClass } from '../../../../../shared/classes/apps/app.class';
import { IApp } from '../../../../../shared/types/apps';
import { AppSelectedClass } from '../../../../../shared/classes/apps/app-selected.class';

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
    private elRef: ElementRef,
    private apps: AppClass,
    private selected: AppSelectedClass
  ) {}

  get _rawApps() {
    return this.apps.rawArray;
  }

  get _groupedApps() {
    return this.apps.groupedArray;
  }

  ngOnChanges(changes) {
    for (let key in changes) {
      if (
        key === 'isModalAddAppOpen' &&
        changes.isModalAddAppOpen?.currentValue === true &&
        this._rawApps.length > 0
      ) {
        this.apps.get('all').then();
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
    return this.selected.checkIfExistsInList(group);
  }

  onCheckboxChange(group: IApp, event) {
    const check = !event; // потому что берется предыдущее значение
    const select = this.elRef.nativeElement.querySelector(
      `#version-${group.ID}`
    );

    if (!select) {
      this.selected.setElementSelection(group);
      if (check) this.selected.checkAppsInConfig(this.appsInConfig, group.ID);
    } else {
      const value = select.value;

      if (value === group.ID) {
        this.selected.setElementSelection(group);
        if (check) this.selected.checkAppsInConfig(this.appsInConfig, group.ID);
      } else {
        this.selected.setElementSelection(group, false, check, value);
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

      this.selected.swapIDs(group, id);

      this.selected.checkAppsInConfig(this.appsInConfig, id);
    }
  }

  resetForm() {
    this.selected.setListOfSelected([]);
  }

  onSubmitHandler() {
    this.onSubmit.emit(this.selected.selectedIDs);
    this.onCancelHandler();
  }

  onCancelHandler() {
    this.resetForm();
    const modal = document.querySelector('#add_app_config');
    modal?.classList.toggle('hidden');
  }
}
