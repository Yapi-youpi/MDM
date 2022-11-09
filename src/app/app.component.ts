import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = '';
  public isAuth: boolean = false;

  constructor() {}

  onActivateHandler(component) {
    this.title = component.title;
    this.isAuth = window.location.pathname === '/auth';
  }
}
