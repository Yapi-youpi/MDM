import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevicesConfig } from '../../../../../interfaces/interfaces';
import { DevicesConfigService } from '../../../../../services/devices-config.service';

@Component({
  selector: 'app-delete-config',
  templateUrl: './delete-config.component.html',
  styleUrls: ['./delete-config.component.scss'],
})
export class DeleteConfigComponent implements OnInit {
  @Input() currentConfig!: DevicesConfig;
  @Output() onSubmit = new EventEmitter();
  constructor(private configService: DevicesConfigService) {}

  ngOnInit(): void {}

  removeConfig(id: string) {
    this.configService
      .removeConfig(id)
      .then((res) => {
        console.log(res);
        this.closeModal();
        this.onSubmit.emit();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }
  closeModal() {
    document.getElementById('modal-delete-config')?.classList.add('hidden');
  }
}
