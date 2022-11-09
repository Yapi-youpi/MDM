import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarComponent {
  public isCollapsed: boolean = false;

  constructor() {}

  onCollapseBtnClickHandler() {
    this.isCollapsed = !this.isCollapsed;
  }
}
