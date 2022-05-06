import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DevicesComponent } from './devices/devices.component';
import { GroupsComponent } from './groups/groups.component';
import { MapComponent } from './map/map.component';
import { ConfigsComponent } from './configs/configs.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
