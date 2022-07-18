import { Component, ElementRef, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() modalID: string = "";
  @Input() isClosable: boolean = false;

  constructor() {}

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (event.target.classList.contains("modal-bg")) {
      event.target.classList.add("hidden");
    }
  }
}
