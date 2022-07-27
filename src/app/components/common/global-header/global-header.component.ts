import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-global-header",
  templateUrl: "./global-header.component.html",
  styleUrls: ["./global-header.component.scss"],
})
export class GlobalHeaderComponent implements OnInit {
  @Input() public title!: string;
  constructor() {}

  ngOnInit(): void {}
}
