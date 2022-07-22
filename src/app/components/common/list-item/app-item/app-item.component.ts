import { Component, Input } from "@angular/core";

import { App } from "../../../../shared/types/apps";
import { appsPaths as api } from "../../../../shared/enums/api";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss']
})
export class AppItemComponent {
  @Input() app!: App;

  public url: string = environment.url + api.GET_ICON;

  constructor() { }
}
