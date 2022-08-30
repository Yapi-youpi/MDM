import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AssetService } from '../../../shared/services/asset.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isSidebarHidden!: boolean;
  public userRole: string = '';

  constructor(private asset: AssetService) {}

  ngOnInit() {
    let t = timer(300).subscribe(() => {
      this.asset.getFromStorage('user-role').then((role: string) => {
        this.userRole = role;
        console.log('get ussser role');
        t.unsubscribe();
      });
    });
  }

  toggleSidebarView() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
