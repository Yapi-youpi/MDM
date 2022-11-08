import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AppRoutingModule } from './hide/app-routing/app-routing.module';
import { AppInterceptor } from './app.interceptor';

import { AppComponent } from './app.component';

// СТРАНИЦЫ
import { AuthComponent } from './hide/components/pages/auth/auth.component';
import { UsersComponent } from './hide/components/pages/users/users.component';
import { DevicesComponent } from './hide/components/pages/devices/devices.component';
import { GroupsComponent } from './hide/components/pages/groups/groups.component';
import { MapComponent } from './hide/components/pages/map/map.component';
import { ConfigsComponent } from './hide/components/pages/configs/configs.component';

// КОМПОНЕНТЫ ПОМЕНБШЕ
import { UserComponent } from './hide/components/common/user/user.component';
import { MenuComponent } from './hide/components/common/menu/menu.component';
import { DeviceItemComponent } from './hide/components/common/list-item/device-item/device-item.component';
import { GlobalContainerComponent } from './hide/components/common/global-container/global-container.component';
import { UserPermissionsComponent } from './hide/components/pages/users/user-permissions/user-permissions.component';
import { ConfigurationComponent } from './hide/components/pages/configuration/configuration.component';
import { QrTipComponent } from './hide/components/common/qr-tip/qr-tip.component';
import { ChangePasswordComponent } from './hide/components/common/modals/change-password/change-password.component';
import { ModalComponent } from './hide/components/common/modal/modal.component';
import { InterfaceComponent } from './hide/components/pages/configuration/interface/interface.component';

import { AddButtonComponent } from './hide/components/common/UI/button/add-button/add-button.component';
import { AuthButtonComponent } from './hide/components/common/UI/button/auth-button/auth-button.component';
import { DeviceActionBtnComponent } from './hide/components/common/UI/button/item-action-btn/device/device-action-btn.component';
import { FilterBtnComponent } from './hide/components/common/UI/button/filter-btn/filter-btn.component';
import { MenuButtonComponent } from './hide/components/common/UI/button/menu-button/menu-button.component';
import { ModalActionBtnsComponent } from './hide/components/common/UI/button/modal-action-btns/modal-action-btns.component';
import { SortBtnComponent } from './hide/components/common/UI/button/sort-btn/sort-btn.component';
import { DeleteDeviceComponent } from './hide/components/common/modals/devices/delete-device/delete-device.component';
import { AddDeviceComponent } from './hide/components/common/modals/devices/add-device/add-device.component';
import { EditSeveralDevicesComponent } from './hide/components/common/modals/devices/edit-several-devices/edit-several-devices.component';
import { EditDeviceComponent } from './hide/components/common/modals/devices/edit-device/edit-device.component';
import { QrCodeComponent } from './hide/components/common/modals/devices/qr-code/qr-code.component';
import { FilterDevicesComponent } from './hide/components/common/modals/devices/filter-devices/filter-devices.component';
import { SelectedElementsComponent } from './hide/components/common/selected-elements/selected-elements.component';
import { InputAlertComponent } from './hide/components/common/UI/alert/input-alert/input-alert.component';
import { StatusIconComponent } from './hide/components/common/UI/status/status-icon/status-icon.component';
import { GlobalHeaderComponent } from './hide/components/common/global-header/global-header.component';
import { ButtonComponent } from './hide/components/common/UI/button/button/button.component';
import { InputPasswordComponent } from './hide/components/common/UI/input/input-password/input-password.component';
import { InputTextComponent } from './hide/components/common/UI/input/input-text/input-text.component';
import { InputCheckboxComponent } from './hide/components/common/UI/input/input-checkbox/input-checkbox.component';
import { InputSelectComponent } from './hide/components/common/UI/input/input-select/input-select.component';
import { AppsComponent } from './hide/components/pages/apps/apps.component';
import { AddAppComponent } from './hide/components/common/modals/apps/add-app/add-app.component';
import { InputFileComponent } from './hide/components/common/UI/input/input-file/input-file.component';
import { InputSwitchComponent } from './hide/components/common/UI/input/input-switch/input-switch.component';
import { InputDatetimeComponent } from './hide/components/common/UI/input/input-datetime/input-datetime.component';
import { InputSearchComponent } from './hide/components/common/UI/input/input-search/input-search.component';
import { AppItemComponent } from './hide/components/common/list-item/app-item/app-item.component';
import { AppActionBtnComponent } from './hide/components/common/UI/button/item-action-btn/app/app-action-btn.component';
import { EditAppComponent } from './hide/components/common/modals/apps/edit-app/edit-app.component';
import { InputSelectAccordionComponent } from './hide/components/common/UI/input/input-select-accordion/input-select-accordion.component';
import { NoListDataComponent } from './hide/components/common/UI/no-list-data/no-list-data.component';
import { DeleteAppComponent } from './hide/components/common/modals/apps/delete-app/delete-app.component';
import { DatetimePickerComponent } from './hide/components/common/modals/datetime-picker/datetime-picker.component';
import { AddAppToConfigComponent } from './hide/components/common/modals/apps/add-app-to-config/add-app-to-config.component';
import { GroupItemComponent } from './hide/components/common/list-item/group-item/group-item.component';
import { GroupActionBtnComponent } from './hide/components/common/UI/button/item-action-btn/group/group-action-btn.component';
import { AppsConfigComponent } from './hide/components/pages/configuration/apps-config/apps-config.component';
import { FilterGroupsComponent } from './hide/components/common/modals/groups/filter-groups/filter-groups.component';
import { EditGroupComponent } from './hide/components/common/modals/groups/edit-group/edit-group.component';
import { DeleteGroupComponent } from './hide/components/common/modals/groups/delete-group/delete-group.component';
import { DeleteSeveralElementsComponent } from './hide/components/common/modals/delete-several-elements/delete-several-elements.component';
import { EditSeveralGroupsComponent } from './hide/components/common/modals/groups/edit-several-groups/edit-several-groups.component';
import { MiniSelectComponent } from './hide/components/common/UI/mini-select/mini-select.component';
import { AddGroupComponent } from './hide/components/common/modals/groups/add-group/add-group.component';
import { AddUserComponent } from './hide/components/common/modals/users/add-user/add-user.component';
import { CardMenuBtnComponent } from './hide/components/common/UI/button/card-menu-btn/card-menu-btn.component';
import { DeleteUserComponent } from './hide/components/common/modals/users/delete-user/delete-user.component';
import { FilterUserComponent } from './hide/components/common/modals/users/filter-user/filter-user.component';
import { AddConfigComponent } from './hide/components/common/modals/configs/add-config/add-config.component';
import { DeleteConfigComponent } from './hide/components/common/modals/configs/delete-config/delete-config.component';
import { AlertComponent } from './hide/components/common/UI/alert/alert/alert.component';

// ПАЙПЫ
import { GroupFilterPipe } from './hide/shared/pipes/filters/group-filter.pipe';
import { SearchUsersPipe } from './hide/shared/pipes/search-users.pipe';
import { FilterUsersPipe } from './hide/shared/pipes/filters/filter-users.pipe';
import { ConfigSearchPipe } from './hide/shared/pipes/config-search.pipe';
import { GroupConverterPipe } from './hide/shared/pipes/group-converter.pipe';
import { SearchPipe } from './hide/shared/pipes/search.pipe';
import { ConfigConverterPipe } from './hide/shared/pipes/config-converter.pipe';
import { DateConverterPipe } from './hide/shared/pipes/date-converter.pipe';
import { DevicesFilterPipe } from './hide/shared/pipes/filters/devices-filter.pipe';
import { DeviceStatusPipe } from './hide/shared/pipes/sort/devices/device-status.pipe';
import { DeviceNamePipe } from './hide/shared/pipes/sort/devices/device-name.pipe';
import { DeviceDatePipe } from './hide/shared/pipes/sort/devices/device-date.pipe';
import { DeviceGroupPipe } from './hide/shared/pipes/sort/devices/device-group.pipe';
import { DeviceBatteryPipe } from './hide/shared/pipes/sort/devices/device-battery.pipe';
import { AppsSystemPipe } from './hide/shared/pipes/sort/apps/apps-system.pipe';
import { AppsNamePipe } from './hide/shared/pipes/sort/apps/apps-name.pipe';
import { AppsSizePipe } from './hide/shared/pipes/sort/apps/apps-size.pipe';
import { MomentPipe } from './hide/shared/pipes/moment.pipe';
import { AppsConfigPipe } from './hide/shared/pipes/sort/apps/apps-config.pipe';
import { FileSizePipe } from './hide/shared/pipes/file-size.pipe';
import { GroupConfigPipe } from './hide/shared/pipes/sort/groups/group-config.pipe';
import { GroupDatePipe } from './hide/shared/pipes/sort/groups/group-date.pipe';
import { GroupDevicesCountPipe } from './hide/shared/pipes/sort/groups/group-devices-count.pipe';
import { GroupNamePipe } from './hide/shared/pipes/sort/groups/group-name.pipe';
import { MessagesComponent } from './hide/components/pages/messages/messages.component';
import { FilterMessagesComponent } from './hide/components/common/modals/messages/filter-messages/filter-messages.component';
import { MsgFilterPipe } from './hide/shared/pipes/filters/msg-filter.pipe';
import { AddMessageComponent } from './hide/components/common/modals/messages/add-message/add-message.component';
import { HelpComponent } from './hide/components/pages/help/help.component';
import { TicketModalComponent } from './hide/components/pages/help/ticket-modal/ticket-modal.component';
import { DevicesFiltersComponent } from './hide/components/common/filters/devices-filters/devices-filters.component';
import { GroupsFiltersComponent } from './hide/components/common/filters/groups-filters/groups-filters.component';
import { AppGroupPipe } from './hide/shared/pipes/filters/app-group.pipe';
import { ListFilesComponent } from './hide/components/common/modals/files/list-files/list-files.component';
import { FileNamePipe } from './hide/shared/pipes/sort/files/file-name.pipe';
import { FileDatePipe } from './hide/shared/pipes/sort/files/file-date.pipe';
import { FileActionBtnComponent } from './hide/components/common/UI/button/item-action-btn/file/file-action-btn.component';
import { DeviceFileSizePipe } from './hide/shared/pipes/sort/files/file-size.pipe';
import { DeleteFileComponent } from './hide/components/common/modals/files/delete-file/delete-file.component';
import { AddFileComponent } from './hide/components/common/modals/files/add-file/add-file.component';
import { FileItemComponent } from './hide/components/common/list-item/file-item/file-item.component';
import { FilesSortPipe } from './hide/shared/pipes/sort/files-sort.pipe';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    // СТРАНИЦЫ
    AuthComponent,
    UsersComponent,
    DevicesComponent,
    GroupsComponent,
    MapComponent,
    ConfigsComponent,
    // КОМПОНЕНТЫ ПОМЕНБШЕ
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
    AppComponent,
    MenuComponent,
    AddAppToConfigComponent,
    UserComponent,
    EditDeviceComponent,
    QrCodeComponent,
    DeviceItemComponent,
    GlobalContainerComponent,
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
    InputSelectAccordionComponent,
    NoListDataComponent,
    DeleteAppComponent,
    DatetimePickerComponent,
    AppsConfigComponent,
    GroupItemComponent,
    FilterGroupsComponent,
    GroupActionBtnComponent,
    EditGroupComponent,
    DeleteGroupComponent,
    EditSeveralGroupsComponent,
    MiniSelectComponent,
    InterfaceComponent,
    AddGroupComponent,
    AddUserComponent,
    CardMenuBtnComponent,
    DeleteUserComponent,
    FilterUserComponent,
    AddConfigComponent,
    DeleteConfigComponent,
    AlertComponent,
    //ПАЙПЫ
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
    AppsConfigPipe,
    MomentPipe,
    FileSizePipe,
    GroupFilterPipe,
    GroupConfigPipe,
    GroupDatePipe,
    GroupDevicesCountPipe,
    GroupNamePipe,
    MessagesComponent,
    FilterMessagesComponent,
    MsgFilterPipe,
    AddMessageComponent,
    HelpComponent,
    TicketModalComponent,
    DevicesFiltersComponent,
    GroupsFiltersComponent,
    AppGroupPipe,
    ListFilesComponent,
    FileNamePipe,
    FileDatePipe,
    FileSizePipe,
    DeviceFileSizePipe,
    FileActionBtnComponent,
    DeleteFileComponent,
    AddFileComponent,
    FileItemComponent,
    FilesSortPipe,
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
    BrowserAnimationsModule,
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
