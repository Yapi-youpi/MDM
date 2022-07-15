import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { IonicStorageModule } from "@ionic/storage-angular";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppInterceptor } from "./app.interceptor";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./components/pages/auth/auth.component";
import { UsersComponent } from "./components/pages/users/users.component";
import { MenuComponent } from "./components/common/menu/menu.component";
import { DevicesComponent } from "./components/pages/devices/devices.component";
import { GroupsComponent } from "./components/pages/groups/groups.component";
import { MapComponent } from "./components/pages/map/map.component";
import { ConfigsComponent } from "./components/pages/configs/configs.component";
import { UserComponent } from "./components/common/user/user.component";
import { QrCodeComponent } from "./components/common/modals/qr-code/qr-code.component";
import { EditDeviceComponent } from "./components/common/modals/edit-device/edit-device.component";
import { DeviceItemComponent } from "./components/common/device-item/device-item.component";
import { GlobalContainerComponent } from "./components/common/global-container/global-container.component";
import { FilterSidebarComponent } from "./components/common/filter-sidebar/filter-sidebar.component";
import { SearchInputComponent } from "./components/common/UI/input/search-input/search-input.component";
import { AddButtonComponent } from "./components/common/UI/button/add-button/add-button.component";
import { PageHeaderComponent } from "./components/common/page-header/page-header.component";
import { InputAlertComponent } from "./components/common/UI/alert/input-alert/input-alert.component";
import { DeleteDeviceComponent } from "./components/common/modals/delete-device/delete-device.component";
import { AddDeviceComponent } from "./components/common/modals/add-device/add-device.component";
import { QrTipComponent } from "./components/common/qr-tip/qr-tip.component";
import { SelectedDevicesComponent } from "./components/common/selected-devices/selected-devices.component";
import { EditSeveralDevicesComponent } from "./components/common/modals/edit-several-devices/edit-several-devices.component";
import { DeleteSeveralElementsComponent } from "./components/common/modals/delete-several-elements/delete-several-elements.component";

import { DateConverterPipe } from "./shared/pipes/date-converter.pipe";
import { DevicesFilterPipe } from "./shared/pipes/devices-filter.pipe";
import { GroupConverterPipe } from "./shared/pipes/group-converter.pipe";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { ConfigConverterPipe } from "./shared/pipes/config-converter.pipe";
import { StatusPipe } from "./shared/pipes/sort/devices/status.pipe";
import { DatePipe } from "./shared/pipes/sort/devices/date.pipe";
import { NamePipe } from "./shared/pipes/sort/devices/name.pipe";
import { GroupPipe } from "./shared/pipes/sort/devices/group.pipe";
import { BatteryPipe } from "./shared/pipes/sort/devices/battery.pipe";
import { ChangePasswordComponent } from "./components/common/modals/change-password/change-password.component";
import { CardComponent } from "./components/common/card/card.component";
import { CentralWrapperComponent } from "./components/common/central-wrapper/central-wrapper.component";
import { FormGroupComponent } from "./components/common/UI/input/form-group/form-group.component";
import { InputComponent } from './components/common/UI/input/input/input.component';
import { AuthButtonComponent } from './components/common/UI/button/auth-button/auth-button.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    // COMPONENTS
    AppComponent,
    UsersComponent,
    AuthComponent,
    MenuComponent,
    DevicesComponent,
    GroupsComponent,
    MapComponent,
    ConfigsComponent,
    UserComponent,
    EditDeviceComponent,
    QrCodeComponent,
    DeviceItemComponent,
    GlobalContainerComponent,
    FilterSidebarComponent,
    SearchInputComponent,
    PageHeaderComponent,
    AddButtonComponent,
    InputAlertComponent,
    DeleteDeviceComponent,
    AddDeviceComponent,
    QrTipComponent,
    SelectedDevicesComponent,
    EditSeveralDevicesComponent,
    // PIPES
    DateConverterPipe,
    DevicesFilterPipe,
    GroupConverterPipe,
    SearchPipe,
    ConfigConverterPipe,
    StatusPipe,
    DatePipe,
    NamePipe,
    GroupPipe,
    BatteryPipe,
    DeleteSeveralElementsComponent,
    DeleteSeveralElementsComponent,
    ChangePasswordComponent,
    CardComponent,
    CentralWrapperComponent,
    FormGroupComponent,
    InputComponent,
    AuthButtonComponent,
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
