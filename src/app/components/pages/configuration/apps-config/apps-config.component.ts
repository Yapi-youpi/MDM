import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { appsPaths as api } from '../../../../shared/enums/api';
import { IApp } from '../../../../shared/types/apps';
import { AppsService } from '../../../../shared/services/apps.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-apps-config',
  templateUrl: './apps-config.component.html',
  styleUrls: ['./apps-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppsConfigComponent implements OnInit {
  @Input() apps: IApp[] = [];
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

  @Output() onSave = new EventEmitter<string>();
  @Output() onChangeAction = new EventEmitter<Array<any>>();
  @Output() onOpenModal = new EventEmitter<boolean>();

  constructor(private appsService: AppsService) {}

  ngOnInit() {}

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

  toggleIcon(id) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      currentApp!.showIcon = !currentApp!.showIcon;
      this.onSave.emit(id);
    }
  }

  changeOrder(id, event) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      currentApp!.screenOrder = +event.target.value;
      this.onSave.emit(id);
    }
  }

  toggleFix(id) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      currentApp!.bottom = !currentApp!.bottom;
      this.onSave.emit(id);
    }
  }

  setModalAddAppOpen() {
    this.onOpenModal.emit(true);
  }

  setAction(id, event) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      if (event.target.value === '0') {
        this.appsService
          .removeFromInstall(this.configId, id)
          .then((res) => console.log(res));
      } else if (event.target.value === '1') {
        this.appsService
          .addToInstall(this.configId, id)
          .then((res) => console.log(res));
      }
      this.onChangeAction.emit([id, event.target.value]);
    }
  }
}
