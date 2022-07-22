import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { inputWidth } from "../../../../../shared/types/input";

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent {
  @Input() control!: FormControl;
  @Input() value: string = ''
  @Input() pattern!: string;

  @Input() name: string = '';
  @Input() width: inputWidth = 'w-170';
  @Input() isError: boolean = false;

  public isPasswordVisible: boolean = false;

  constructor() { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
