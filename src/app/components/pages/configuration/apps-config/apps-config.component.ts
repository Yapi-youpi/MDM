import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { appsPaths as api } from '../../../../shared/enums/api';
import { timer } from 'rxjs';
import { AppClass } from '../../../../shared/classes/apps/app.class';
import { IApp } from '../../../../shared/types';

@Component({
  selector: 'app-apps-config',
  templateUrl: './apps-config.component.html',
  styleUrls: ['./apps-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppsConfigComponent {
  @Input() appsInConfig: string[] = [];
  @Input() installedAppsInConfig: string[] = [];
  @Input() removedAppsInConfig: string[] = [];
  @Input() configId: string = '';
  @Input() isModalAddAppOpen!: boolean;

  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';
  public isOnlySystemApps: boolean = false;
  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isPositionSortAsc: boolean = true;
  public loading: boolean = false;

  @Output() onSave = new EventEmitter<IApp>();
  @Output() onChangeAction = new EventEmitter<Array<any>>();
  @Output() onOpenModal = new EventEmitter<boolean>();

  constructor(private apps: AppClass) {}

  get _apps() {
    return this.apps.rawArray;
  }

  onChangeSearch(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.loading = true;

    const t = timer(500).subscribe(() => {
      t.unsubscribe();
      this.isOnlySystemApps = !this.isOnlySystemApps;
      this.loading = false;
    });
  }

  toggleName() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }

  toggleSize() {
    this.isSizeSortAsc = !this.isSizeSortAsc;
  }

  togglePosition() {
    this.isPositionSortAsc = !this.isPositionSortAsc;
  }

  toggleIcon(app: IApp) {
    const currentApp = this._apps.find((a) => a.ID === app.ID);
    if (currentApp) {
      currentApp!.showIcon = !currentApp!.showIcon;
      this.onSave.emit(app);
    }
  }

  changeOrder(app: IApp, event) {
    const currentApp = this._apps.find((a) => a.ID === app.ID);
    if (currentApp) {
      currentApp!.screenOrder = +event.target.value;
      this.onSave.emit(app);
    }
  }

  toggleFix(app: IApp) {
    const currentApp = this._apps.find((a) => a.ID === app.ID);
    if (currentApp) {
      currentApp!.bottom = !currentApp!.bottom;
      this.onSave.emit(app);
    }
  }

  setModalAddAppOpen() {
    this.onOpenModal.emit(true);
  }

  setAction(id, event) {
    const currentApp = this._apps.find((app) => app.ID === id);
    if (currentApp) {
      if (event.target.value === '0') {
        this.apps.removeFromInstall(this.configId, id).then((res) => {});
      } else if (event.target.value === '1') {
        this.apps.addToInstall(this.configId, id).then((res) => {});
      }
      this.onChangeAction.emit([id, event.target.value]);
    }
  }
}
