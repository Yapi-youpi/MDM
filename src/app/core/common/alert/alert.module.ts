import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './alert.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  providers: [AlertService],
  exports: [AlertComponent],
})
export class AlertModule {}
