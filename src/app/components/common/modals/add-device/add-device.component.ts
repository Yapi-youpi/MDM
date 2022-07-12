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

import M from "materialize-css";

import { DevicesConfig } from "../../../../interfaces/config";
import { DevicesGroups } from "../../../../interfaces/groups";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.css"],
})
export class AddDeviceComponent implements OnInit {
  @Input() public configs!: DevicesConfig[];
  @Input() public groups!: DevicesGroups[];
  @Input() public form!: FormGroup;
  @Input() public isAddDeviceFormSubmitted: boolean = false;

  @Output() public onFirstSubmit = new EventEmitter();

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

  get _name() {
    return this.form.get("name");
  }
  get _desc() {
    return this.form.get("desc");
  }
  get _config() {
    return this.form.get("config_id");
  }
  get _group() {
    return this.form.get("group_id");
  }

  onFirstSubmitHandler() {
    this.isAddDeviceFormSubmitted = true;

    if (this.form.invalid) {
      return;
    } else {
      this.onFirstSubmit.emit();
    }
  }
  onCancelHandler() {
    this.isAddDeviceFormSubmitted = false;
    this.form.reset();
  }
}
