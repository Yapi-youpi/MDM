import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { interval } from "rxjs";

// import M from "materialize-css";

import { FilterDevicesService } from "../../../shared/services/forms/device/filter-devices.service";

import { DevicesConfig } from "../../../shared/types/config";
import { DevicesGroups } from "../../../shared/types/groups";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.css"],
})
export class FilterSidebarComponent implements OnInit {
  @Input() configs!: DevicesConfig[];
  @Input() groups!: DevicesGroups[];

  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onReset = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    public form: FilterDevicesService
  ) {}

  ngOnInit(): void {
    // const sidebar =
    //   this.elementRef.nativeElement.querySelector(".sidenav.filter");
    //
    // M.Sidenav.init(sidebar, {
    //   edge: "right",
    // });
    //
    // let filterSelectsInter = interval(2000).subscribe(() => {
    //   const filterSelects =
    //     this.elementRef.nativeElement.querySelectorAll(".filter-select");
    //   if (filterSelects && filterSelects.length !== 0) {
    //     filterSelectsInter.unsubscribe();
    //     M.FormSelect.init(filterSelects);
    //   }
    // });
  }

  get _form() {
    return this.form.form;
  }

  get _isStatusOn() {
    return this.form.form.controls["status-on"].value;
  }

  get _isStatusOff() {
    return this.form.form.controls["status-off"].value;
  }

  toggleSearchDevicesOn() {
    this.form.form.controls["status-on"].setValue(
      !this.form.form.controls["status-on"].value
    );
  }

  toggleSearchDevicesOff() {
    this.form.form.controls["status-off"].setValue(
      !this.form.form.controls["status-off"].value
    );
  }

  onResetHandler() {
    this.form.reset();
    this.onReset.emit();
  }

  onSubmitHandler() {
    this.onSubmit.emit(this.form.form);
  }
}
