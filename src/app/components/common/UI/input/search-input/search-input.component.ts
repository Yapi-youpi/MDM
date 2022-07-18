import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent {
  @Input() public value: string = "";

  @Output() onChange = new EventEmitter<string>();

  public isSearchFocused: boolean = false;

  constructor() {}

  onChangeHandler(value: string) {
    this.onChange.emit(value);
  }

  setSearchFocus() {
    this.isSearchFocused = true;
  }
  resetSearchFocus() {
    this.isSearchFocused = false;
  }
}
