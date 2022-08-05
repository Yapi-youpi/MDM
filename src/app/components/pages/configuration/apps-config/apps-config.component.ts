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
import { App } from '../../../../shared/types/apps';
import { AppsService } from '../../../../shared/services/apps.service';

@Component({
  selector: 'app-apps-config',
  templateUrl: './apps-config.component.html',
  styleUrls: ['./apps-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppsConfigComponent implements OnInit {
  @Input() apps: App[] = [];
  @Input() appsInConfig: string[] = [];
  @Input() configId: string = '';
  @Input() isModalAddAppOpen!: boolean;
  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';
  public isOnlySystemApps: boolean = false;
  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isPositionSortAsc: boolean = true;

  @Output() onSave = new EventEmitter<string>();
  @Output() onOpenModal = new EventEmitter<boolean>();

  constructor(private appsService: AppsService) {}

  ngOnInit() {}

  onChangeSearch(value: string) {
    this.searchParam = value;
  }

  toggleSystemApps() {
    this.isOnlySystemApps = !this.isOnlySystemApps;
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
    if (event.target.value == 0) {
      this.appsService
        .removeAppFromInstall(this.configId, id)
        .then((res) => console.log(res));
    } else if (event.target.value == 1) {
      this.appsService
        .addAppToInstall(this.configId, id)
        .then((res) => console.log(res));
    }
  }
}
