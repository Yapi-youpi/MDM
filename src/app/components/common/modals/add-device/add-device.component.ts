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

import { DevicesGroups } from "../../../../interfaces/groups";
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
    return this.form.firstForm;
  }

  get _isSubmitted() {
    return this.form.isFirstFormSubmitted;
  }

  get _name() {
    return this.form.firstForm.get("name");
  }

  get _description() {
    return this.form.firstForm.get("description");
  }

  get _group() {
    return this.form.firstForm.get("device_group_id");
  }

  onSubmitHandler() {
    this.form.setFirstFormSubmitted();

    if (this.form.firstForm.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }
  onCancelHandler() {
    this.form.resetFirstFormSubmitted();
    this.form.resetFirstForm();
  }
}
