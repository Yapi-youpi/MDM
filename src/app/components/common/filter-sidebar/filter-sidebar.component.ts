import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import M from "materialize-css";
import { DevicesConfig, Groups } from "../../../interfaces/interfaces";
import { FormGroup } from "@angular/forms";
import { interval } from "rxjs";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.css"],
})
export class FilterSidebarComponent implements OnInit {
  @Input() configs!: DevicesConfig[];
  @Input() groups!: Groups[];
  @Input() form!: FormGroup;

  @Output() onSetFilterSettings = new EventEmitter<FormGroup>();
  @Output() onResetFilterSettings = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const sidebar =
      this.elementRef.nativeElement.querySelector(".sidenav.filter");

    M.Sidenav.init(sidebar, {
      edge: "right",
    });

    let filterSelectsInter = interval(2000).subscribe(() => {
      const filterSelects =
        this.elementRef.nativeElement.querySelectorAll(".filter-select");
      if (filterSelects && filterSelects.length !== 0) {
        filterSelectsInter.unsubscribe();
        M.FormSelect.init(filterSelects);
      }
    });
  }

  toggleSearchDevicesOn() {
    this.form.controls["status-on"].setValue(
      !this.form.controls["status-on"].value
    );
  }
  toggleSearchDevicesOff() {
    this.form.controls["status-off"].setValue(
      !this.form.controls["status-off"].value
    );
  }
  resetFilters() {
    this.form.reset({
      "status-on": false,
      "status-off": false,
      "date-from": null,
      "date-to": null,
      config_ids: null,
      group_ids: null,
    });
    this.onResetFilterSettings.emit();
  }
  setFilterSettings() {
    this.onSetFilterSettings.emit(this.form);
  }
}
