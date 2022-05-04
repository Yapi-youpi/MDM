import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  changePassword(pass: string) {
    this.userService
      .changePassword(pass)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }
}
