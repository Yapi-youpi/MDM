import { Component, Input } from "@angular/core";
import { inputWidth } from "../../../../../shared/types/input";
import { FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-input-datetime",
  templateUrl: "./input-datetime.component.html",
  styleUrls: ["./input-datetime.component.scss"],
})
export class InputDatetimeComponent {
  @Input() name: string = "";
  @Input() width: inputWidth = "w-170";
  @Input() control: FormControl = new FormControl(null);
  @Input() isError: boolean = false;

  // @Input() onChange = new EventEmitter

  public currDay!: moment.Moment;

  constructor() {}

  showDatetimePicker() {
    console.log(this.name);
    const modal = document.querySelector("#datetime_picker");
    modal?.classList.toggle("hidden");
  }

  selectDay(day: moment.Moment) {
    this.currDay = day;
    // console.log(moment(day).utc().format());
    // console.log(this.currDay);
    console.log(this.control, this.name);

    this.control.setValue(moment(day).utc().format());
    // console.log(this.control.value);
  }
}
