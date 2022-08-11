import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  setActive(event) {
    const target = event.target;
    const tabs = this.elementRef.nativeElement.querySelectorAll('.tab');
    const tabsContent =
      this.elementRef.nativeElement.querySelectorAll('.help-tab');
    const header = this.elementRef.nativeElement.querySelector('.card-title');

    if (target && target.matches('.tab')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
      if (header) header.textContent = target.textContent;
    }

    function hideTabContent() {
      tabsContent.forEach((item) => (item.style.display = 'none'));
      tabs.forEach((item) => item.classList.remove('tab--active'));
    }

    function showTabContent(i = 0) {
      tabsContent[i].style.display = 'flex';
      tabs[i].classList.add('tab--active');
    }
  }
}
