import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-delete-several-elements",
  templateUrl: "./delete-several-elements.component.html",
  styleUrls: ["./delete-several-elements.component.scss"],
})
export class DeleteSeveralElementsComponent {
  @Output() onSubmit = new EventEmitter();

  constructor() {}

  onSubmitHandler() {
    this.onSubmit.emit();
  }
}
