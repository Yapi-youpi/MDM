import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UsersComponent } from './components/pages/users/users.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { DevicesComponent } from './components/pages/devices/devices.component';
import { GroupsComponent } from './components/pages/groups/groups.component';
import { ConfigsComponent } from './components/pages/configs/configs.component';
import { MapComponent } from './components/pages/map/map.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { UserComponent } from './components/common/user/user.component';
import { GlobalContainerComponent } from './components/common/global-container/global-container.component';
import { SearchInputComponent } from './components/common/UI/search-input/search-input.component';
import { FilterSidebarComponent } from './components/common/filter-sidebar/filter-sidebar.component';
import { DeviceItemComponent } from './components/common/device-item/device-item.component';
import { EditDeviceComponent } from './components/common/modals/edit-device/edit-device.component';
import { QrCodeComponent } from './components/common/modals/qr-code/qr-code.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AuthComponent,
    MenuComponent,
    DevicesComponent,
    GroupsComponent,
    MapComponent,
    ConfigsComponent,
    UserComponent,
    GlobalContainerComponent,
    SearchInputComponent,
    FilterSidebarComponent,
    DeviceItemComponent,
    EditDeviceComponent,
    QrCodeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
