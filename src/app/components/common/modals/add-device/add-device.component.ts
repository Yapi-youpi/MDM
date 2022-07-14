import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { interval } from "rxjs";

import M from "materialize-css";

import { DevicesGroups } from "../../../../shared/interfaces/groups";
import { AddDeviceService } from "../../../../shared/services/forms/device/add-device.service";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.css"],
})
export class AddDeviceComponent implements OnInit {
  @Input() public groups!: DevicesGroups[];

  @Output() public onSubmit = new EventEmitter();

  constructor(private elementRef: ElementRef, public form: AddDeviceService) {}

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

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _name() {
    return this.form.form.get("name");
  }

  get _description() {
    return this.form.form.get("description");
  }

  get _group() {
    return this.form.form.get("device_group_id");
  }

  onSubmitHandler() {
    this.form.setFormSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }
  onCancelHandler() {
    this.form.resetFormSubmitted();
    this.form.resetForm();
  }
}
