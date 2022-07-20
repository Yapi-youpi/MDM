import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "../components/pages/users/users.component";
import { AuthComponent } from "../components/pages/auth/auth.component";
import { DevicesComponent } from "../components/pages/devices/devices.component";
import { GroupsComponent } from "../components/pages/groups/groups.component";
import { MapComponent } from "../components/pages/map/map.component";
import { ConfigsComponent } from "../components/pages/configs/configs.component";

const routes: Routes = [
  // {
  //   path: "users",
  //   component: UsersComponent,
  // },
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path: "devices",
    component: DevicesComponent,
  },
  // {
  //   path: "groups",
  //   component: GroupsComponent,
  // },
  // {
  //   path: "map",
  //   component: MapComponent,
  // },
  // {
  //   path: "config",
  //   component: ConfigsComponent,
  // },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}
