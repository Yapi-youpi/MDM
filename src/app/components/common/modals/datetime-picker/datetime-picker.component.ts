import { Component } from "@angular/core";
import { DateService } from "../../../../shared/services/date/date.service";
import * as moment from "moment";

@Component({
  selector: "app-datetime-picker",
  templateUrl: "./datetime-picker.component.html",
  styleUrls: ["./datetime-picker.component.scss"],
})
export class DatetimePickerComponent {
  constructor(public dateService: DateService) {}

  get _prev() {
    return moment(this.dateService.date.value).add(-1, "month");
  }

  get _next() {
    return moment(this.dateService.date.value).add(1, "month");
  }

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
