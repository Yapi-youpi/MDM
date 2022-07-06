import { Component, ElementRef, OnInit } from "@angular/core";
import M from "materialize-css";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.css"],
})
export class FilterSidebarComponent implements OnInit {
  public isConfigDropdownHidden: boolean = true;
  public isGroupDropdownHidden: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const sidebar =
      this.elementRef.nativeElement.querySelector(".sidenav.filter");
    const accordions =
      this.elementRef.nativeElement.querySelectorAll(".collapsible");

    M.Sidenav.init(sidebar, {
      edge: "right",
    });
    M.Collapsible.init(accordions, {
      accordion: false,
    });
  }

  toggleConfigDropdown() {
    this.isConfigDropdownHidden = !this.isConfigDropdownHidden;
  }
  toggleGroupDropdown() {
    this.isGroupDropdownHidden = !this.isGroupDropdownHidden;
  }
}
