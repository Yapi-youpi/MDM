import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"],
})
export class SearchInputComponent {
  @Input() public value: string = "";

  @Output() onChange = new EventEmitter<string>();

  constructor() {}

  onChangeHandler(value: string) {
    this.onChange.emit(value);
  }
}
