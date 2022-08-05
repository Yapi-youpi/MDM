import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() public isSidebarHidden!: boolean;
  @Output() onSidebarHide = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    let t = timer(20).subscribe(() => {
      const path = window.location.pathname.slice(1);
      const elem = document.getElementById(path);
      elem?.classList.add('active');
      t.unsubscribe();
    });
  }

  toggleSidebarView() {
    this.onSidebarHide.emit(this.isSidebarHidden);
  }
}
