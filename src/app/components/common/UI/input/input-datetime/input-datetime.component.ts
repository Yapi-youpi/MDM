import { Component, Input } from "@angular/core";
import { inputWidth } from "../../../../../shared/types/input";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.scss']
})
export class InputDatetimeComponent {
  @Input() name: string = "";
  @Input() width: inputWidth = "w-170";
  @Input() control: FormControl = new FormControl(null);
  @Input() isError: boolean = false;

  constructor() {}
}
