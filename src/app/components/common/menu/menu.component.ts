import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { AssetService } from '../../../shared/services/asset.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() public isSidebarHidden!: boolean;
  public userRole: string = '';
  @Output() onSidebarHide = new EventEmitter<any>();
  constructor(private asset: AssetService) {}

  ngOnInit() {
    let t = timer(200).subscribe(() => {
      const path = window.location.pathname.slice(1);
      const elem = document.getElementById(path);
      elem?.classList.add('active');
      this.asset.getFromStorage('user-role').then((role: string) => {
        this.userRole = role;
      });
      t.unsubscribe();
    });
  }

  toggleSidebarView() {
    this.onSidebarHide.emit(this.isSidebarHidden);
  }
}
