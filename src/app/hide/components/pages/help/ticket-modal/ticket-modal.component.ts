import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent {
  public ticket = '';

  sendTicket() {
    console.log('send', this.ticket);
  }

  closeModal() {
    this.ticket = '';
    document.getElementById('modal-add-ticket')?.classList.add('hidden');
  }
}
