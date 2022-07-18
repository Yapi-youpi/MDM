import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { interval } from "rxjs";

// import M from "materialize-css";

import { DevicesGroups } from "../../../../shared/types/groups";

import { EditSeveralDevicesService } from "../../../../shared/services/forms/device/edit-several-devices.service";

@Component({
  selector: "app-edit-several-devices",
  templateUrl: "./edit-several-devices.component.html",
  styleUrls: ["./edit-several-devices.component.scss"],
})
export class EditSeveralDevicesComponent implements OnInit {
  @Input() groups!: DevicesGroups[];

  @Output() onSubmit = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    public form: EditSeveralDevicesService
  ) {}

  ngOnInit() {
    // let i = interval(2000).subscribe(() => {
    //   const elem = this.elementRef.nativeElement.querySelector(
    //     ".several-group-select-modal"
    //   );
    //   if (elem) {
    //     i.unsubscribe();
    //     M.FormSelect.init(elem);
    //   }
    // });
  }

  get _form() {
    return this.form.form;
  }

  get _isSubmitted() {
    return this.form.isSubmitted;
  }

  get _group() {
    return this.form.form.get("device_group_id");
  }

  onSubmitHandler() {
    this.form.setSubmitted();

    if (this.form.form.invalid) {
      return;
    } else {
      this.onSubmit.emit();
    }
  }

  onResetHandler() {
    this.form.resetSubmitted();
    this.form.resetForm();
  }
}
