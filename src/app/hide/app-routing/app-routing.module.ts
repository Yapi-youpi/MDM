import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../components/pages/users/users.component';
import { AuthComponent } from '../components/pages/auth/auth.component';
import { DevicesComponent } from '../components/pages/devices/devices.component';
import { GroupsComponent } from '../components/pages/groups/groups.component';
import { MapComponent } from '../components/pages/map/map.component';
import { ConfigsComponent } from '../components/pages/configs/configs.component';
import { ConfigurationComponent } from '../components/pages/configuration/configuration.component';
import { AppsComponent } from '../components/pages/apps/apps.component';
import { MessagesComponent } from '../components/pages/messages/messages.component';
import { HelpComponent } from '../components/pages/help/help.component';
import { AuthGuard, NotAuthGuard, RoleGuard } from '../guards';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apps',
    component: AppsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      requiredRoles: ['super', 'admin'],
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      requiredRoles: ['super', 'admin'],
    },
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configs',
    component: ConfigsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      requiredRoles: ['super', 'admin'],
    },
  },
  {
    path: 'configs/:id',
    component: ConfigurationComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      requiredRoles: ['super', 'admin'],
    },
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'devices',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}
