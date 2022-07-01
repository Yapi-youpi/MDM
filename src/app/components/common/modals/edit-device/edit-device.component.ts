import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DevicesConfig, Groups } from "../../../../interfaces/interfaces";
import { interval } from "rxjs";
import M from "materialize-css";

@Component({
  selector: "app-edit-device",
  templateUrl: "./edit-device.component.html",
  styleUrls: ["./edit-device.component.css"],
})
export class EditDeviceComponent implements OnInit {
  @Input() public form!: FormGroup;
  @Input() public edit: boolean = false;
  @Input() public groups!: Groups[];
  @Input() public configs!: DevicesConfig[];
  @Input() public addDevice!: Function;
  @Input() public saveChange!: Function;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    let i = interval(1000).subscribe(() => {
      const elems = this.elementRef.nativeElement.querySelectorAll(
        ".config-select-modal"
      );
      if (elems && elems.length !== 0) {
        i.unsubscribe();
        M.FormSelect.init(elems, {});
      }
    });
  }
}
