import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DevicesConfig, Groups } from "../../../../interfaces/interfaces";

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

  constructor() {}

  ngOnInit(): void {}
}
