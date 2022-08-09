import { Component, OnInit } from '@angular/core';
interface Message {
  date: string;
  status: string;
  group: string;
  text: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public search!: string;
  public isNameSortAsc: boolean = true;
  public messages!: Message[];
  constructor() {
    this.messages = [
      {
        date: '2022-02-28T12:02:39Z',
        status: 'Отправлено',
        group: '123456',
        text: 'Предлагаем отметить Международный день кошек',
      },
      {
        date: '2022-04-12T15:53:59Z',
        status: 'Отправлено',
        group: '123456',
        text: 'Предлагаем отметить Международный день кошек',
      },
      {
        date: '2022-06-03T09:21:31Z',
        status: 'Не отправлено',
        group: '123456',
        text: 'Предлагаем отметить Международный день кошек',
      },
    ];
  }

  ngOnInit(): void {}

  asd() {}

  toggleNameSortDir() {
    this.isNameSortAsc = !this.isNameSortAsc;
  }
}
