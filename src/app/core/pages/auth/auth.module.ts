import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth.component';
import { FormModule } from '../../../shared/components/UI/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, FormModule, ReactiveFormsModule, CommonModule],
})
export class AuthModule {}
