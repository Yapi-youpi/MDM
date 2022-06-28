import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  public isSidebarHidden: boolean = false;

  constructor() {}

  ngOnInit(): void {
    let path = window.location.pathname.slice(1);
    let elem = document.getElementById(`${path}`);
    if (elem) {
      elem.classList.add("active");
    }
  }

  toggleSidebarView() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
