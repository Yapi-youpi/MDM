import { NgModule } from '@angular/core';
import { CheckboxComponent, PasswordComponent, TextComponent } from './input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TextComponent, PasswordComponent, CheckboxComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [TextComponent, PasswordComponent, CheckboxComponent],
})
export class FormModule {}
