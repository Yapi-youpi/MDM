import { Component, Input } from "@angular/core";
import { DevicesGroup } from "../../../../shared/types/groups";
import { DevicesConfig } from "../../../../shared/types/config";

@Component({
  selector: "app-group-item",
  templateUrl: "./group-item.component.html",
  styleUrls: ["./group-item.component.scss"],
})
export class GroupItemComponent {
  @Input() group!: DevicesGroup;
  @Input() configs!: DevicesConfig[];

  constructor() {}

  get _dLength() {
    return Object.keys(this.group.devices).length;
  }
}
