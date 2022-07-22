import { Component, Input } from "@angular/core";

import { App } from "../../../../shared/types/apps";

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss']
})
export class AppItemComponent {
  @Input() app!: App;

  constructor() { }
}
