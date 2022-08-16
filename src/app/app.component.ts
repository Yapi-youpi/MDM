import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'SDM';
  public isAuth = false;

  constructor() {}

  onActivate(component) {
    this.title = component.title;
    this.isAuth = window.location.pathname === '/auth';
  }
}
