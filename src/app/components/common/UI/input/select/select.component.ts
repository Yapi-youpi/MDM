import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

import { inputWidth, Option } from "../../../../../shared/types/input";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent {
  @Input() selectWidth: inputWidth = "w-170";
  @Input() items: Option[] = [];
  @Input() currOption!: Option;

  @Output() onSelect = new EventEmitter<Option>();

  public isDropdownHidden: boolean = true;
  public isFilled: boolean = false;
  public copy: Option[] = [];

  constructor() {}

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!event.target.classList.contains("dropdown-item")) {
      this.isDropdownHidden = true;
    }
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  setCurrentHTML(item: any) {
    this.currOption = item;

    this.onSelect.emit(item);

    this.toggleDropdown();
  }

  identify(index, item) {
    return item.html;
  }
}
