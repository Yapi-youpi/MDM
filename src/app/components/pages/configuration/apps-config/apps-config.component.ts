import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { appsPaths as api } from '../../../../shared/enums/api';
import { appsService } from '../../../../shared/services';
import { App } from '../../../../shared/types/apps';

@Component({
  selector: 'app-apps-config',
  templateUrl: './apps-config.component.html',
  styleUrls: ['./apps-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppsConfigComponent implements OnInit {
  @Input() apps: App[] = [];
  @Input() appsInConfig: string[] = [];
  private editedApps: App[] = [];
  public url: string = environment.url + api.GET_ICON;
  public searchParam: string = '';
  public isOnlySystemApps: boolean = false;
  public isNameSortAsc: boolean = true;
  public isSizeSortAsc: boolean = true;
  public isPositionSortAsc: boolean = true;

  constructor(private appsService: appsService) {}

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
      this.editedApps.push(currentApp);
    }
  }

  changeOrder(id, event) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      currentApp!.screenOrder = event.target.value;
      this.editedApps.push(currentApp);
    }
  }

  toggleFix(id) {
    const currentApp = this.apps.find((app) => app.ID === id);
    if (currentApp) {
      currentApp!.bottom = !currentApp!.bottom;
      this.editedApps.push(currentApp);
    }
  }

  editApp() {
    this.editedApps.map((app) => {
      this.appsService
        .edit(app)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  }
}
