import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() modalID: string = "";
  @Input() isClosable: boolean = false;
  @Input() direction: "vertical" | "horizontal" = "vertical";

  constructor() {}

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (event.target.classList.contains("modal-bg") && this.isClosable) {
      event.target.classList.add("hidden");
    }
  }
}
