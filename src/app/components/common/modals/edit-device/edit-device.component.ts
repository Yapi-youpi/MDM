import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { interval } from "rxjs";

import M from "materialize-css";

import { EditDeviceService } from "../../../../shared/services/forms/device/edit-device.service";

import { Device } from "../../../../interfaces/devices";
import { DevicesGroups } from "../../../../interfaces/groups";
import { DevicesConfig } from "../../../../interfaces/config";

@Component({
  selector: "app-edit-device",
  templateUrl: "./edit-device.component.html",
  styleUrls: ["./edit-device.component.css"],
})
export class EditDeviceComponent implements OnInit {
  @Input() public device!: Device;
  @Input() public groups!: DevicesGroups[];
  @Input() public configs!: DevicesConfig[];

  @Output() public onSetDeviceSettings = new EventEmitter<Device>();

  constructor(private elementRef: ElementRef, public form: EditDeviceService) {}

  ngOnInit(): void {
    let i = interval(2000).subscribe(() => {
      const elems = this.elementRef.nativeElement.querySelectorAll(
        ".config-select-modal"
      );
      if (elems && elems.length !== 0) {
        i.unsubscribe();
        M.FormSelect.init(elems);
      }
    });
  }

  get _form() {
    return this.form.form;
  }

  get _name() {
    return this.form.form.get("name");
  }

  get _description() {
    return this.form.form.get("description");
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  onSubmitHandler(device: Device) {
    this.form.setSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSetDeviceSettings.emit(device);
    }
  }
  onCancelHandler() {
    this.form.resetSubmitted();
    this.form.form.reset();
  }
}
