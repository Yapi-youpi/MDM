import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() public isSidebarHidden!: boolean;

  @Output() onSidebarHide = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    let path = window.location.pathname.slice(1);
    let elem = document.getElementById(`${path}`);
    if (elem) {
      elem.classList.add("active");
    }
  }

  toggleSidebarView() {
    this.onSidebarHide.emit(this.isSidebarHidden);
  }
}
