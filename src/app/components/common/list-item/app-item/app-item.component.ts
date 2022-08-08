import { Component, EventEmitter, Input, Output } from '@angular/core';

import { App } from '../../../../shared/types/apps';
import { appsPaths as api } from '../../../../shared/enums/api';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss'],
})
export class AppItemComponent {
  @Input() app!: App;

  @Output() onEditClick = new EventEmitter<App>();
  @Output() onDeleteClick = new EventEmitter<App>();

  public isChildrenHidden: boolean = true;

  public url: string = environment.url + api.GET_ICON;

  constructor() {}

  get _height() {
    return this.isChildrenHidden
      ? 60
      : 60 + (40 + 1) * (this.app.children?.length || 0);
  }

  toggleChildren() {
    this.isChildrenHidden = !this.isChildrenHidden;
  }

  onEditClickHandler(app: App) {
    this.onEditClick.emit(app);
  }

  onDeleteClickHandler(app: App) {
    this.onDeleteClick.emit(app);
  }
}
