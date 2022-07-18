import { Component, ElementRef, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() modalID: string = "";
  @Input() isModalOpen: boolean = false;
  @Input() isClosable: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isModalOpen = false;
    }
    // if (event.target.className === "modal-bg") {
    //   this.isModalOpen = false;
    // }
    // console.log(event.target);
  }
}
