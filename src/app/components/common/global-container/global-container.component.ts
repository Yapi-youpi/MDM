import { Component } from '@angular/core';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrls: ['./global-container.component.scss'],
})
export class GlobalContainerComponent {
  public isSidebarHidden: boolean = false;

  constructor() {}

  toggleSidebarView() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
