import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {
  @Input() control!: FormControl;
  @Input() value: string = ''

  @Input() name: string = '';
  @Input() isError: boolean = false;

  public isPasswordVisible: boolean = false;

  constructor() { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
