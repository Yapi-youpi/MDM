import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { AuthComponent } from '../auth/auth.component';
import { DevicesComponent } from '../devices/devices.component';
import { GroupsComponent } from '../groups/groups.component';
import { MapComponent } from '../map/map.component';
import { ConfigsComponent } from '../configs/configs.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'config',
    component: ConfigsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}
