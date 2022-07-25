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

import { DeviceItemComponent } from "./components/common/list-item/device-item/device-item.component";
import { GlobalContainerComponent } from "./components/common/global-container/global-container.component";
import { FilterSidebarComponent } from "./components/common/filter-sidebar/filter-sidebar.component";
import { SearchUsersPipe } from "./services/search-users.pipe";
import { FilterUsersPipe } from "./services/filter-users.pipe";
import { UserPermissionsComponent } from "./components/pages/user-permissions/user-permissions.component";
import { ConfigurationComponent } from "./components/pages/configuration/configuration.component";
import { ConfigSearchPipe } from "./services/config-search.pipe";
import { CardComponent } from "./components/common/card/card.component";
import { CentralWrapperComponent } from "./components/common/central-wrapper/central-wrapper.component";
import { QrTipComponent } from "./components/common/qr-tip/qr-tip.component";
import { ChangePasswordComponent } from "./components/common/modals/change-password/change-password.component";
import { ModalComponent } from "./components/common/modal/modal.component";
import { GroupConverterPipe } from "./shared/pipes/group-converter.pipe";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { ConfigConverterPipe } from "./shared/pipes/config-converter.pipe";
import { DateConverterPipe } from "./shared/pipes/date-converter.pipe";
import { DevicesFilterPipe } from "./shared/pipes/devices-filter.pipe";
import { DeviceStatusPipe } from "./shared/pipes/sort/devices/device-status.pipe";
import { DeviceNamePipe } from "./shared/pipes/sort/devices/device-name.pipe";
import { DeviceDatePipe } from "./shared/pipes/sort/devices/device-date.pipe";
import { DeviceGroupPipe } from "./shared/pipes/sort/devices/device-group.pipe";
import { DeviceBatteryPipe } from "./shared/pipes/sort/devices/device-battery.pipe";
import { AddButtonComponent } from "./components/common/UI/button/add-button/add-button.component";
import { AuthButtonComponent } from "./components/common/UI/button/auth-button/auth-button.component";
import { DeviceActionBtnComponent } from "./components/common/UI/button/item-action-btn/device/device-action-btn.component";
import { FilterBtnComponent } from "./components/common/UI/button/filter-btn/filter-btn.component";
import { MenuButtonComponent } from "./components/common/UI/button/menu-button/menu-button.component";
import { ModalActionBtnsComponent } from "./components/common/UI/button/modal-action-btns/modal-action-btns.component";
import { SortBtnComponent } from "./components/common/UI/button/sort-btn/sort-btn.component";
import { DeleteDeviceComponent } from "./components/common/modals/devices/delete-device/delete-device.component";
import { AddDeviceComponent } from "./components/common/modals/devices/add-device/add-device.component";
import { DeleteSeveralElementsComponent } from "./components/common/modals/devices/delete-several-elements/delete-several-elements.component";
import { EditSeveralDevicesComponent } from "./components/common/modals/devices/edit-several-devices/edit-several-devices.component";
import { EditDeviceComponent } from "./components/common/modals/devices/edit-device/edit-device.component";
import { QrCodeComponent } from "./components/common/modals/devices/qr-code/qr-code.component";
import { FilterDevicesComponent } from "./components/common/modals/devices/filter-devices/filter-devices.component";
import { SelectedElementsComponent } from "./components/common/selected-elements/selected-elements.component";
import { InputAlertComponent } from "./components/common/UI/alert/input-alert/input-alert.component";
import { StatusIconComponent } from "./components/common/UI/status/status-icon/status-icon.component";
import { GlobalHeaderComponent } from "./components/common/global-header/global-header.component";
import { ButtonComponent } from "./components/common/UI/button/button/button.component";
import { InputPasswordComponent } from "./components/common/UI/input/input-password/input-password.component";
import { InputTextComponent } from "./components/common/UI/input/input-text/input-text.component";
import { InputCheckboxComponent } from "./components/common/UI/input/input-checkbox/input-checkbox.component";
import { InputSelectComponent } from "./components/common/UI/input/input-select/input-select.component";
import { AppsComponent } from "./components/pages/apps/apps.component";
import { AddAppComponent } from "./components/common/modals/apps/add-app/add-app.component";
import { InputFileComponent } from "./components/common/UI/input/input-file/input-file.component";
import { InputSwitchComponent } from "./components/common/UI/input/input-switch/input-switch.component";
import { InputDatetimeComponent } from "./components/common/UI/input/input-datetime/input-datetime.component";
import { InputSearchComponent } from "./components/common/UI/input/input-search/input-search.component";
import { AppsSystemPipe } from "./shared/pipes/sort/apps/apps-system.pipe";
import { AppItemComponent } from "./components/common/list-item/app-item/app-item.component";
import { AppActionBtnComponent } from "./components/common/UI/button/item-action-btn/app/app-action-btn.component";
import { EditAppComponent } from "./components/common/modals/apps/edit-app/edit-app.component";
import { AppsNamePipe } from "./shared/pipes/sort/apps/apps-name.pipe";
import { AppsSizePipe } from './shared/pipes/sort/apps/apps-size.pipe';
import { InputSelectAccordionComponent } from './components/common/UI/input/input-select-accordion/input-select-accordion.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    // component
    GlobalHeaderComponent,
    StatusIconComponent,
    InputAlertComponent,
    SelectedElementsComponent,
    FilterDevicesComponent,
    ModalActionBtnsComponent,
    FilterBtnComponent,
    MenuButtonComponent,
    DeviceActionBtnComponent,
    AddButtonComponent,
    SortBtnComponent,
    AuthButtonComponent,
    ModalComponent,
    DeleteDeviceComponent,
    ChangePasswordComponent,
    AddDeviceComponent,
    DeleteSeveralElementsComponent,
    EditSeveralDevicesComponent,
    QrTipComponent,
    CentralWrapperComponent,
    CardComponent,
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
    SearchUsersPipe,
    FilterUsersPipe,
    UserPermissionsComponent,
    ConfigurationComponent,
    ButtonComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputCheckboxComponent,
    InputSelectComponent,
    AppsComponent,
    AddAppComponent,
    InputFileComponent,
    InputSwitchComponent,
    InputDatetimeComponent,
    InputSearchComponent,
    AppItemComponent,
    AppActionBtnComponent,
    EditAppComponent,
    // pipe
    GroupConverterPipe,
    ConfigSearchPipe,
    SearchPipe,
    ConfigConverterPipe,
    DateConverterPipe,
    DevicesFilterPipe,
    DeviceStatusPipe,
    DeviceNamePipe,
    DeviceDatePipe,
    DeviceGroupPipe,
    DeviceBatteryPipe,
    AppsNamePipe,
    AppsSystemPipe,
    AppsSizePipe,
    InputSelectAccordionComponent,
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
