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
import { QrCodeComponent } from "./components/common/modals/devices/qr-code/qr-code.component";
import { EditDeviceComponent } from "./components/common/modals/devices/edit-device/edit-device.component";
import { DeviceItemComponent } from "./components/common/device-item/device-item.component";
import { GlobalContainerComponent } from "./components/common/global-container/global-container.component";
import { SearchInputComponent } from "./components/common/UI/input/search-input/search-input.component";
import { AddButtonComponent } from "./components/common/UI/button/add-button/add-button.component";
import { PageHeaderComponent } from "./components/common/page-header/page-header.component";
import { InputAlertComponent } from "./components/common/UI/alert/input-alert/input-alert.component";
import { DeleteDeviceComponent } from "./components/common/modals/devices/delete-device/delete-device.component";
import { AddDeviceComponent } from "./components/common/modals/devices/add-device/add-device.component";
import { QrTipComponent } from "./components/common/qr-tip/qr-tip.component";
import { SelectedElementsComponent } from "./components/common/selected-elements/selected-elements.component";
import { EditSeveralDevicesComponent } from "./components/common/modals/devices/edit-several-devices/edit-several-devices.component";
import { DeleteSeveralElementsComponent } from "./components/common/modals/devices/delete-several-elements/delete-several-elements.component";

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
import { InputComponent } from "./components/common/UI/input/input/input.component";
import { AuthButtonComponent } from "./components/common/UI/button/auth-button/auth-button.component";
import { CheckboxComponent } from "./components/common/UI/input/checkbox/checkbox.component";
import { MenuButtonComponent } from "./components/common/UI/button/menu-button/menu-button.component";
import { ModalComponent } from "./components/common/modal/modal.component";
import { FilterDevicesComponent } from "./components/common/modals/devices/filter-devices/filter-devices.component";
import { FilterBtnComponent } from "./components/common/UI/button/filter-btn/filter-btn.component";
import { SortBtnComponent } from "./components/common/UI/button/sort-btn/sort-btn.component";
import { SwitchInputComponent } from "./components/common/UI/input/switch-input/switch-input.component";
import { DeviceActionBtnComponent } from "./components/common/UI/button/device-action-btn/device-action-btn.component";
import { StatusIconComponent } from "./components/common/UI/status/status-icon/status-icon.component";
import { ModalActionBtnsComponent } from "./components/common/UI/button/modal-action-btns/modal-action-btns.component";
import { AppsComponent } from "./components/pages/apps/apps.component";

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
    SearchInputComponent,
    PageHeaderComponent,
    AddButtonComponent,
    InputAlertComponent,
    DeleteDeviceComponent,
    AddDeviceComponent,
    QrTipComponent,
    SelectedElementsComponent,
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
    CheckboxComponent,
    MenuButtonComponent,
    ModalComponent,
    FilterDevicesComponent,
    FilterBtnComponent,
    SortBtnComponent,
    SwitchInputComponent,
    DeviceActionBtnComponent,
    StatusIconComponent,
    ModalActionBtnsComponent,
    AppsComponent,
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
