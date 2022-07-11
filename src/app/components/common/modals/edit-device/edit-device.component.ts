import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { interval } from "rxjs";

import M from "materialize-css";

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
  @Input() public form!: FormGroup;
  @Input() public groups!: DevicesGroups[];
  @Input() public configs!: DevicesConfig[];

  @Output() public onSetDeviceSettings = new EventEmitter<Device>();

  constructor(private elementRef: ElementRef) {}

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

  public get _name() {
    return this.form.get("name");
  }
  public get _desc() {
    return this.form.get("desc");
  }

  setDeviceSettings(device: Device) {
    this.onSetDeviceSettings.emit(device);
  }
}
