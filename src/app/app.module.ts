import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PageWrapperModule } from './core/common/page-wrapper/page-wrapper.module';
import { AlertModule } from './core/common/alert/alert.module';
import { ParseService, StorageService, UserService } from './shared/services';
import { LoaderModel, UserModel } from './shared/models';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PageWrapperModule,
    AlertModule,
  ],
  providers: [
    StorageService,
    ParseService,
    LoaderModel,
    UserService,
    UserModel,
  ],
  // declarations: [
  //   // СТРАНИЦЫ
  //   AuthComponent,
  //   UsersComponent,
  //   DevicesComponent,
  //   GroupsComponent,
  //   MapComponent,
  //   ConfigsComponent,
  //   // КОМПОНЕНТЫ ПОМЕНБШЕ
  //   GlobalHeaderComponent,
  //   StatusIconComponent,
  //   InputAlertComponent,
  //   SelectedElementsComponent,
  //   FilterDevicesComponent,
  //   ModalActionBtnsComponent,
  //   FilterBtnComponent,
  //   MenuButtonComponent,
  //   DeviceActionBtnComponent,
  //   AddButtonComponent,
  //   SortBtnComponent,
  //   AuthButtonComponent,
  //   ModalComponent,
  //   DeleteDeviceComponent,
  //   ChangePasswordComponent,
  //   AddDeviceComponent,
  //   DeleteSeveralElementsComponent,
  //   EditSeveralDevicesComponent,
  //   QrTipComponent,
  //   AppComponent,
  //   MenuComponent,
  //   AddAppToConfigComponent,
  //   UserComponent,
  //   EditDeviceComponent,
  //   QrCodeComponent,
  //   DeviceItemComponent,
  //   GlobalContainerComponent,
  //   SearchUsersPipe,
  //   FilterUsersPipe,
  //   UserPermissionsComponent,
  //   ConfigurationComponent,
  //   ButtonComponent,
  //   InputPasswordComponent,
  //   InputTextComponent,
  //   InputCheckboxComponent,
  //   InputSelectComponent,
  //   AppsComponent,
  //   AddAppComponent,
  //   InputFileComponent,
  //   InputSwitchComponent,
  //   InputDatetimeComponent,
  //   InputSearchComponent,
  //   AppItemComponent,
  //   AppActionBtnComponent,
  //   EditAppComponent,
  //   InputSelectAccordionComponent,
  //   NoListDataComponent,
  //   DeleteAppComponent,
  //   DatetimePickerComponent,
  //   AppsConfigComponent,
  //   GroupItemComponent,
  //   FilterGroupsComponent,
  //   GroupActionBtnComponent,
  //   EditGroupComponent,
  //   DeleteGroupComponent,
  //   EditSeveralGroupsComponent,
  //   MiniSelectComponent,
  //   InterfaceComponent,
  //   AddGroupComponent,
  //   AddUserComponent,
  //   CardMenuBtnComponent,
  //   DeleteUserComponent,
  //   FilterUserComponent,
  //   AddConfigComponent,
  //   DeleteConfigComponent,
  //   AlertComponent,
  //   //ПАЙПЫ
  //   GroupConverterPipe,
  //   ConfigSearchPipe,
  //   SearchPipe,
  //   ConfigConverterPipe,
  //   DateConverterPipe,
  //   DevicesFilterPipe,
  //   DeviceStatusPipe,
  //   DeviceNamePipe,
  //   DeviceDatePipe,
  //   DeviceGroupPipe,
  //   DeviceBatteryPipe,
  //   AppsNamePipe,
  //   AppsSystemPipe,
  //   AppsSizePipe,
  //   AppsConfigPipe,
  //   MomentPipe,
  //   FileSizePipe,
  //   GroupFilterPipe,
  //   GroupConfigPipe,
  //   GroupDatePipe,
  //   GroupDevicesCountPipe,
  //   GroupNamePipe,
  //   MessagesComponent,
  //   FilterMessagesComponent,
  //   MsgFilterPipe,
  //   AddMessageComponent,
  //   HelpComponent,
  //   TicketModalComponent,
  //   DevicesFiltersComponent,
  //   GroupsFiltersComponent,
  //   AppGroupPipe,
  //   ListFilesComponent,
  //   FileNamePipe,
  //   FileDatePipe,
  //   FileSizePipe,
  //   DeviceFileSizePipe,
  //   FileActionBtnComponent,
  //   DeleteFileComponent,
  //   AddFileComponent,
  //   FileItemComponent,
  //   FilesSortPipe,
  // ],
  // imports: [
  //   BrowserModule,
  //   RouterModule,
  //   AppRoutingModule,
  //   HttpClientModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   IonicStorageModule.forRoot(),
  //   NgxQRCodeModule,
  //   RouterModule.forRoot(routes),
  //   BrowserAnimationsModule,
  // ],
  // providers: [
  //   { provide: LocationStrategy, useClass: PathLocationStrategy },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AppInterceptor,
  //     multi: true,
  //   },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
